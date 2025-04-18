import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  query, 
  orderBy, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  where,
  Timestamp,
  arrayUnion,
  arrayRemove,
  getDocs,
  docData
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable, from, of, throwError, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, catchError, take } from 'rxjs/operators';

export interface Community {
  id?: string;
  name: string;
  description: string;
  createdAt: Date | Timestamp;
  createdBy: string; // User ID of creator
  creatorName: string; // Display name of creator
  memberCount: number;
  imageUrl?: string; // Optional community image
  bannerUrl?: string; // Optional banner image
  isPrivate: boolean; // Whether the community is private (requires membership to view/post)
  members?: string[]; // Array of user IDs who are members
  moderators: string[]; // Array of user IDs who can moderate
}

export interface Post {
  id?: string;
  title: string;
  content: string;
  createdAt: Date | Timestamp;
  userId: string;
  userName: string;
  replyCount: number;
  upvotes: string[]; // Array of user IDs who upvoted
  score: number; // Net score (upvotes count)
  communityId: string; // ID of the community this post belongs to
  communityName?: string; // Name of the community (for convenience)
}

export interface Reply {
  id?: string;
  content: string;
  createdAt: Date | any; // Using any to accommodate Firebase Timestamp
  userId: string;
  userName: string;
  postId: string; // ID of the post this reply belongs to
  parentId?: string; // For replies to replies (null or undefined if direct reply to post)
  depth?: number; // Depth level of the reply (0 for direct replies to post, 1+ for nested replies)
  upvotes?: string[]; // Array of user IDs who upvoted
  score?: number; // Net score (upvotes count)
}

export interface NestedReply extends Reply {
  children?: NestedReply[]; // Child replies
}

export enum SortOption {
  Newest = 'newest',
  Oldest = 'oldest',
  Best = 'best'
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private currentUser: User | null = null;
  private postsCache = new Map<string, Post[]>();
  private repliesCache = new Map<string, Reply[]>();
  private communitiesCache = new Map<string, Community[]>();
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private communitiesSubject = new BehaviorSubject<Community[]>([]);
  
  constructor(private firestore: Firestore, private auth: Auth) {
    // Listen to auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
    
    // Initial load of communities and posts
    this.refreshCommunities();
  }
  
  // COMMUNITY METHODS
  
  // Refresh communities from Firestore
  private refreshCommunities(): void {
    const communitiesCollection = collection(this.firestore, 'communities');
    const communitiesQuery = query(communitiesCollection);
    
    collectionData(communitiesQuery, { idField: 'id' })
      .pipe(
        take(1),
        map(communities => {
          return communities.map(community => {
            // Format timestamp and ensure properties exist
            if (community['createdAt'] && typeof (community['createdAt'] as any).toDate === 'function') {
              community['createdAt'] = (community['createdAt'] as any).toDate();
            }
            return {
              ...community,
              memberCount: community['memberCount'] || 0,
              members: community['members'] || [],
              moderators: community['moderators'] || []
            };
          }) as Community[];
        }),
        catchError(error => {
          console.error('Error fetching communities:', error);
          return of([]);
        })
      )
      .subscribe(communities => {
        this.communitiesSubject.next(communities);
        this.communitiesCache.set('all', communities);
        
        // After communities are loaded, load posts for each community
        if (communities.length > 0) {
          this.refreshPosts();
        }
      });
  }
  
  // Get all communities
  getCommunities(): Observable<Community[]> {
    return this.communitiesSubject.asObservable();
  }
  
  // Get a single community by ID
  getCommunity(communityId: string): Observable<Community | null> {
    // Check cache first
    const cachedCommunities = this.communitiesCache.get('all');
    if (cachedCommunities) {
      const cachedCommunity = cachedCommunities.find(c => c.id === communityId);
      if (cachedCommunity) {
        return of(cachedCommunity);
      }
    }
    
    // If not in cache, fetch from Firestore
    const communityDoc = doc(this.firestore, 'communities', communityId);
    return from(getDoc(communityDoc)).pipe(
      map(communitySnap => {
        if (communitySnap.exists()) {
          const data = communitySnap.data() as Community;
          // Convert timestamp if needed
          if (data.createdAt && typeof (data.createdAt as any).toDate === 'function') {
            data.createdAt = (data.createdAt as any).toDate();
          }
          return { ...data, id: communitySnap.id };
        }
        return null;
      }),
      catchError(error => {
        console.error(`Error fetching community ${communityId}:`, error);
        return of(null);
      })
    );
  }
  
  // Create a new community
  createCommunity(community: Omit<Community, 'createdAt' | 'createdBy' | 'creatorName' | 'memberCount' | 'members' | 'moderators'>): Observable<string> {
    if (!this.currentUser) {
      return throwError(() => new Error('You must be logged in to create a community'));
    }
    
    const communitiesCollection = collection(this.firestore, 'communities');
    
    // Check if a community with the same name already exists
    const nameCheckQuery = query(
      communitiesCollection,
      where('name', '==', community.name)
    );
    
    return from(getDocs(nameCheckQuery)).pipe(
      switchMap(querySnapshot => {
        if (!querySnapshot.empty) {
          return throwError(() => new Error('A community with this name already exists'));
        }
        
        // Prepare the community object with default values
        const newCommunity: Community = {
          ...community,
          createdAt: new Date(),
          createdBy: this.currentUser!.uid,
          creatorName: this.currentUser!.displayName || this.currentUser!.email || 'Anonymous',
          memberCount: 1, // Creator is the first member
          members: [this.currentUser!.uid], // Creator is automatically a member
          moderators: [this.currentUser!.uid] // Creator is automatically a moderator
        };
        
        return from(addDoc(communitiesCollection, newCommunity)).pipe(
          map(docRef => {
            // Update cache
            const communityWithId = {
              ...newCommunity,
              id: docRef.id
            };
            
            // Update the communities cache
            const cachedCommunities = this.communitiesCache.get('all') || [];
            this.communitiesCache.set('all', [...cachedCommunities, communityWithId]);
            
            // Notify subscribers
            const currentCommunities = this.communitiesSubject.value;
            this.communitiesSubject.next([...currentCommunities, communityWithId]);
            
            console.log(`Created community ${docRef.id}`);
            return docRef.id;
          }),
          catchError(error => {
            console.error('Error creating community:', error);
            return throwError(() => new Error('Failed to create community: ' + error.message));
          })
        );
      })
    );
  }
  
  // Join a community (become a member)
  async joinCommunity(communityId: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('You must be logged in to join a community');
    }
    
    try {
      const userId = this.currentUser.uid;
      
      // Check if already a member
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (!communitySnap.exists()) {
        throw new Error('Community not found');
      }
      
      const communityData = communitySnap.data() as Community;
      
      // Skip if already a member
      if (communityData.members && communityData.members.includes(userId)) {
        console.log('User is already a member of this community');
        return;
      }
      
      // Add user to members array and increment member count
      await updateDoc(communityRef, {
        members: arrayUnion(userId),
        memberCount: (communityData.memberCount || 0) + 1
      });
      
      console.log(`User ${userId} joined community ${communityId}`);
      
      // Update cache if it exists
      this.updateCommunityInCache(communityId, {
        members: [...(communityData.members || []), userId],
        memberCount: (communityData.memberCount || 0) + 1
      });
      
      // Refresh communities to update UI
      this.refreshCommunities();
    } catch (error) {
      console.error(`Error joining community ${communityId}:`, error);
      throw error;
    }
  }

  // Leave a community
  async leaveCommunity(communityId: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('You must be logged in to leave a community');
    }
    
    try {
      const userId = this.currentUser.uid;
      
      // Check if a member
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (!communitySnap.exists()) {
        throw new Error('Community not found');
      }
      
      const communityData = communitySnap.data() as Community;
      
      // Skip if not a member
      if (!communityData.members || !communityData.members.includes(userId)) {
        console.log('User is not a member of this community');
        return;
      }
      
      // Check if user is the creator - creators can't leave their own communities
      if (communityData.createdBy === userId) {
        throw new Error('As the creator, you cannot leave your own community. You can delete it instead.');
      }
      
      // Remove user from members array and decrement member count
      await updateDoc(communityRef, {
        members: arrayRemove(userId),
        moderators: arrayRemove(userId), // Also remove from moderators if they are one
        memberCount: Math.max((communityData.memberCount || 1) - 1, 0)
      });
      
      console.log(`User ${userId} left community ${communityId}`);
      
      // Update cache if it exists
      const updatedMembers = (communityData.members || []).filter(id => id !== userId);
      const updatedModerators = (communityData.moderators || []).filter(id => id !== userId);
      
      this.updateCommunityInCache(communityId, {
        members: updatedMembers,
        moderators: updatedModerators,
        memberCount: Math.max((communityData.memberCount || 1) - 1, 0)
      });
      
      // Refresh communities to update UI
      this.refreshCommunities();
    } catch (error) {
      console.error(`Error leaving community ${communityId}:`, error);
      throw error;
    }
  }
  
  // Check if user is a member of a community
  async isCommunityMember(communityId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      // Check cache first
      const cachedCommunities = this.communitiesCache.get('all');
      if (cachedCommunities) {
        const cachedCommunity = cachedCommunities.find(c => c.id === communityId);
        if (cachedCommunity) {
          return (cachedCommunity.members || []).includes(this.currentUser.uid);
        }
      }
      
      // If not in cache, fetch from Firestore
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (communitySnap.exists()) {
        const communityData = communitySnap.data() as Community;
        const members = communityData.members || [];
        return members.includes(this.currentUser.uid);
      }
      
      return false;
    } catch (error) {
      console.error(`Error checking membership for community ${communityId}:`, error);
      return false;
    }
  }
  
  // Check if user is a moderator of a community
  async isCommunityModerator(communityId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      // Check cache first
      const cachedCommunities = this.communitiesCache.get('all');
      if (cachedCommunities) {
        const cachedCommunity = cachedCommunities.find(c => c.id === communityId);
        if (cachedCommunity) {
          return (cachedCommunity.moderators || []).includes(this.currentUser.uid);
        }
      }
      
      // If not in cache, fetch from Firestore
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (communitySnap.exists()) {
        const communityData = communitySnap.data() as Community;
        const moderators = communityData.moderators || [];
        return moderators.includes(this.currentUser.uid);
      }
      
      return false;
    } catch (error) {
      console.error(`Error checking moderator status for community ${communityId}:`, error);
      return false;
    }
  }
  
  // Update a community in the cache
  private updateCommunityInCache(communityId: string, update: Partial<Community>): void {
    const allCommunities = this.communitiesSubject.value;
    const updatedCommunities = allCommunities.map(community => {
      if (community.id === communityId) {
        return { ...community, ...update };
      }
      return community;
    });
    this.communitiesSubject.next(updatedCommunities);
    
    // Update the all communities cache
    this.communitiesCache.set('all', updatedCommunities);
  }

  // Get communities that the current user is a member of
  getUserCommunities(): Observable<Community[]> {
    if (!this.currentUser) {
      return of([]);
    }
    
    const userId = this.currentUser.uid;
    const communitiesCollection = collection(this.firestore, 'communities');
    
    // Query for communities where the user is a member
    const userCommunitiesQuery = query(
      communitiesCollection,
      where('members', 'array-contains', userId)
    );
    
    // Use BehaviorSubject to cache the result
    return collectionData(userCommunitiesQuery, { idField: 'id' }).pipe(
      map(communities => communities as Community[]),
      tap(communities => {
        // Update cache with user's communities
        const userCommunitiesCache = 'user_communities';
        this.communitiesCache.set(userCommunitiesCache, communities);
        
        // Also update individual community cache entries
        communities.forEach(community => {
          const cacheKey = `community_${community.id}`;
          this.communitiesCache.set(cacheKey, [community]);
        });
        
        console.log(`User has ${communities.length} communities`);
      }),
      catchError(error => {
        console.error('Error fetching user communities:', error);
        
        // Try to return from cache if available
        const cachedCommunities = this.communitiesCache.get('user_communities');
        if (cachedCommunities && cachedCommunities.length > 0) {
          console.log('Returning cached user communities');
          return of(cachedCommunities);
        }
        
        return of([]);
      })
    );
  }

  // Get posts from communities the user has joined (For You feed)
  getForYouPosts(sortOption: SortOption = SortOption.Newest): Observable<Post[]> {
    if (!this.currentUser) {
      return of([]);
    }
    
    return this.getUserCommunities().pipe(
      switchMap(communities => {
        if (communities.length === 0) {
          return of([]);
        }
        
        const communityIds = communities.map(c => c.id!);
        
        // Check cache first
        let cachedPosts: Post[] = [];
        let allCached = true;
        
        for (const communityId of communityIds) {
          const key = `community_${communityId}`;
          
          if (this.postsCache.has(key)) {
            cachedPosts = [...cachedPosts, ...this.postsCache.get(key)!];
          } else {
            allCached = false;
            break;
          }
        }
        
        if (allCached && cachedPosts.length > 0) {
          return of(this.sortPosts(cachedPosts, sortOption));
        }
        
        // If not all in cache, fetch from Firestore
        const postsCollection = collection(this.firestore, 'posts');
        const postsQuery = query(
          postsCollection,
          where('communityId', 'in', communityIds)
        );
        
        return collectionData(postsQuery, { idField: 'id' }).pipe(
          map(posts => {
            const formattedPosts = posts.map(post => {
              // Format timestamp
              if (post['createdAt'] && typeof (post['createdAt'] as any).toDate === 'function') {
                post['createdAt'] = (post['createdAt'] as any).toDate();
              }
              return post as Post;
            });
            
            return this.sortPosts(formattedPosts, sortOption);
          }),
          catchError(error => {
            console.error('Error fetching for you posts:', error);
            return of([]);
          })
        );
      })
    );
  }

  // Refresh posts from Firestore
  private refreshPosts(): void {
    const postsCollection = collection(this.firestore, 'posts');
    const postsQuery = query(postsCollection);
    
    collectionData(postsQuery, { idField: 'id' })
      .pipe(
        take(1),
        map(posts => {
          return posts.map(post => {
            // Format timestamp and ensure properties exist
            if (post['createdAt'] && typeof (post['createdAt'] as any).toDate === 'function') {
              post['createdAt'] = (post['createdAt'] as any).toDate();
            }
            return {
              ...post,
              upvotes: post['upvotes'] || [],
              score: post['score'] || 0
            };
          }) as Post[];
        }),
        catchError(error => {
          console.error('Error fetching posts:', error);
          return of([]);
        })
      )
      .subscribe(posts => {
        this.postsSubject.next(posts);
        this.postsCache.set('all', posts);
      });
  }

  // Get all posts with optional sorting
  getPosts(sortOption: SortOption = SortOption.Newest): Observable<Post[]> {
    return this.postsSubject.pipe(
      map(posts => {
        return this.sortPosts([...posts], sortOption);
      })
    );
  }
  
  // Get posts for a specific community
  getPostsForCommunity(communityId: string, sortOption: SortOption = SortOption.Newest): Observable<Post[]> {
    // Check cache first
    const cachedPosts = this.postsCache.get(`community_${communityId}`);
    if (cachedPosts) {
      return of(this.sortPosts([...cachedPosts], sortOption));
    }
    
    // If not in cache, fetch from Firestore
    const postsCollection = collection(this.firestore, 'posts');
    const postsQuery = query(postsCollection, where('communityId', '==', communityId));
    
    return collectionData(postsQuery, { idField: 'id' }).pipe(
      map(posts => {
        const normalizedPosts = posts.map(post => {
          // Format timestamp and ensure properties exist
          if (post['createdAt'] && typeof (post['createdAt'] as any).toDate === 'function') {
            post['createdAt'] = (post['createdAt'] as any).toDate();
          }
          return {
            ...post,
            upvotes: post['upvotes'] || [],
            score: post['score'] || 0
          };
        }) as Post[];
        
        // Cache the community posts
        this.postsCache.set(`community_${communityId}`, normalizedPosts);
        
        return this.sortPosts(normalizedPosts, sortOption);
      }),
      catchError(error => {
        console.error(`Error fetching posts for community ${communityId}:`, error);
        return of([]);
      })
    );
  }

  // Sort posts based on the selected option
  private sortPosts(posts: Post[], sortOption: SortOption): Post[] {
    switch (sortOption) {
      case SortOption.Newest:
        return posts.sort((a, b) => {
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.formatDate(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.formatDate(b['createdAt']);
          return dateB.getTime() - dateA.getTime(); // Newest first
        });
      case SortOption.Oldest:
        return posts.sort((a, b) => {
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.formatDate(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.formatDate(b['createdAt']);
          return dateA.getTime() - dateB.getTime(); // Oldest first
        });
      case SortOption.Best:
        return posts.sort((a, b) => b.score - a.score); // Highest score first
      default:
        return posts;
    }
  }

  // Get a specific post by ID
  getPost(postId: string): Observable<Post | null> {
    // First check if we have this post in any of our caches
    for (const [, posts] of this.postsCache.entries()) {
      const cachedPost = posts.find(p => p.id === postId);
      if (cachedPost) {
        console.log(`Found post ${postId} in cache`);
        return of(cachedPost);
      }
    }
    
    // Also check in the main posts subject
    const mainPosts = this.postsSubject.value;
    const mainCachedPost = mainPosts.find(p => p.id === postId);
    if (mainCachedPost) {
      console.log(`Found post ${postId} in main posts subject`);
      return of(mainCachedPost);
    }

    // If not in cache, fetch from Firestore
    console.log(`Fetching post ${postId} from Firestore`);
    const postDoc = doc(this.firestore, 'posts', postId);
    
    // Use a more efficient approach with a single docData call
    return docData(postDoc, { idField: 'id' }).pipe(
      take(1),
      map(postData => {
        if (!postData) return null;
        
        // Format date
        let post = postData as any as Post;
        if (post.createdAt && typeof (post.createdAt as any).toDate === 'function') {
          post.createdAt = (post.createdAt as any).toDate();
        }
        
        // Make sure all properties exist
        post = {
          ...post,
          upvotes: post.upvotes || [],
          replyCount: post.replyCount || 0,
          score: post.score || 0
        };
        
        // Add to appropriate cache
        if (post.communityId) {
          const communityPosts = this.postsCache.get(`community_${post.communityId}`) || [];
          if (!communityPosts.some(p => p.id === post.id)) {
            this.postsCache.set(`community_${post.communityId}`, [...communityPosts, post]);
          }
        }
        
        return post;
      })
    );
  }

  // Create a new post in a community
  createPost(
    communityId: string, 
    post: Omit<Post, 'userId' | 'userName' | 'createdAt' | 'replyCount' | 'upvotes' | 'score' | 'communityId' | 'communityName'>
  ): Observable<string> {
    if (!this.currentUser) {
      return throwError(() => new Error('You must be logged in to create a post'));
    }
    
    // Check if user is a member of the community first
    return from(this.isCommunityMember(communityId)).pipe(
      switchMap(isMember => {
        if (!isMember) {
          return throwError(() => new Error('You must be a member of this community to post'));
        }
        
        // Get community data to include name
        return from(getDoc(doc(this.firestore, 'communities', communityId))).pipe(
          switchMap(communityDoc => {
            if (!communityDoc.exists()) {
              return throwError(() => new Error('Community not found'));
            }
            
            const communityData = communityDoc.data() as Community;
            
            // Prepare the post with user and community data
            const newPost: Post = {
              ...post,
              userId: this.currentUser!.uid,
              userName: this.currentUser!.displayName || this.currentUser!.email?.split('@')[0] || 'Anonymous',
              createdAt: new Date(),
              replyCount: 0,
              upvotes: [],
              score: 0,
              communityId: communityId,
              communityName: communityData.name
            };
            
            return from(addDoc(collection(this.firestore, 'posts'), newPost)).pipe(
              map(docRef => {
                const postWithId = {
                  ...newPost,
                  id: docRef.id
                };
                
                // Update the posts cache
                // Cache under community-specific key
                const cacheKey = `community_${communityId}`;
                const communityPosts = this.postsCache.get(cacheKey) || [];
                this.postsCache.set(cacheKey, [postWithId, ...communityPosts]);
                
                // Also update the general posts cache
                const allPosts = this.postsSubject.value;
                this.postsSubject.next([postWithId, ...allPosts]);
                
                console.log(`Created post ${docRef.id} in community ${communityId}`);
                return docRef.id;
              }),
              catchError(error => {
                console.error('Error creating post:', error);
                return throwError(() => new Error('Failed to create post: ' + error.message));
              })
            );
          })
        );
      })
    );
  }

  // Get all replies for a post
  getReplies(postId: string, sortOption: SortOption = SortOption.Best): Observable<Reply[]> {
    // Check cache
    if (this.repliesCache.has(postId)) {
      return of(this.sortReplies([...this.repliesCache.get(postId)!], sortOption));
    }
    
    const repliesCollection = collection(this.firestore, 'replies');
    const repliesQuery = query(
      repliesCollection, 
      where('postId', '==', postId)
    );
    
    return from(getDocs(repliesQuery)).pipe(
      map(querySnapshot => {
        const replies: Reply[] = [];
        
        querySnapshot.forEach(doc => {
          const data = doc.data();
          // Convert Firebase timestamp to Date if necessary
          let createdAt = data['createdAt'];
          if (createdAt && typeof createdAt.toDate === 'function') {
            createdAt = createdAt.toDate();
          }
          
          replies.push({
            ...data,
            id: doc.id,
            createdAt: createdAt,
            upvotes: data['upvotes'] || [],
            score: data['score'] || 0,
            depth: data['depth'] || 0
          } as Reply);
        });
        
        // Cache the replies
        this.repliesCache.set(postId, replies);
        
        // Sort and return
        return this.sortReplies(replies, sortOption);
      }),
      catchError(error => {
        console.error(`Error fetching replies for post ${postId}:`, error);
        return of([]);
      })
    );
  }

  // Sort replies based on the selected option
  private sortReplies(replies: Reply[], sortOption: SortOption): Reply[] {
    switch (sortOption) {
      case SortOption.Newest:
        return replies.sort((a, b) => {
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.getDateFromTimestamp(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.getDateFromTimestamp(b['createdAt']);
          return dateB.getTime() - dateA.getTime(); // Newest first
        });
      case SortOption.Oldest:
        return replies.sort((a, b) => {
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.getDateFromTimestamp(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.getDateFromTimestamp(b['createdAt']);
          return dateA.getTime() - dateB.getTime(); // Oldest first
        });
      case SortOption.Best:
        return replies.sort((a, b) => b.score - a.score); // Highest score first
      default:
        return replies;
    }
  }

  // Get replies organized in a nested structure
  getNestedReplies(postId: string, sortOption: SortOption = SortOption.Best): Observable<NestedReply[]> {
    return this.getReplies(postId, sortOption).pipe(
      map(replies => {
        // Organize replies into a nested structure
        const replyMap = new Map<string, NestedReply>();
        const rootReplies: NestedReply[] = [];

        // First pass: create a map of all replies by ID
        replies.forEach(reply => {
          replyMap.set(reply.id!, { ...reply, children: [] });
        });

        // Second pass: build the hierarchy
        replies.forEach(reply => {
          const replyWithChildren = replyMap.get(reply.id!) as NestedReply;
          
          if (!reply.parentId) {
            // This is a root-level reply (direct to post)
            rootReplies.push(replyWithChildren);
          } else {
            // This is a nested reply
            const parent = replyMap.get(reply.parentId);
            if (parent) {
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(replyWithChildren);
            } else {
              // If parent not found (should be rare), treat as root
              rootReplies.push(replyWithChildren);
            }
          }
        });
        
        return rootReplies;
      })
    );
  }

  // Add a reply to a post or another reply
  addReply(postId: string, content: string, parentId?: string): Observable<string> {
    if (!this.currentUser) {
      return throwError(() => new Error('You must be logged in to reply'));
    }
    
    if (!content.trim()) {
      return throwError(() => new Error('Reply content cannot be empty'));
    }
    
    // First get the post to validate it exists
    return from(getDoc(doc(this.firestore, 'posts', postId))).pipe(
      switchMap(postDoc => {
        if (!postDoc.exists()) {
          return throwError(() => new Error('Post not found'));
        }
        
        const postData = postDoc.data() as Post;
        
        // If it's a reply to another reply, get the parent to determine depth
        let getParentReply$ = of({ depth: 0 }); // Default for direct replies to post
        
        if (parentId) {
          getParentReply$ = from(getDoc(doc(this.firestore, 'replies', parentId))).pipe(
            map(replyDoc => {
              if (!replyDoc.exists()) {
                throw new Error('Parent reply not found');
              }
              const replyData = replyDoc.data() as Reply;
              return { 
                depth: replyData.depth !== undefined ? replyData.depth : 0 
              };
            })
          );
        }
        
        return getParentReply$.pipe(
          switchMap(parentReply => {
            // Calculate depth (0 for direct replies to post, parentDepth + 1 for replies to replies)
            const depth = parentId ? (parentReply.depth + 1) : 0;
            
            // Create the new reply
            const newReply: Reply = {
              content: content.trim(),
              createdAt: new Date(),
              userId: this.currentUser!.uid,
              userName: this.currentUser!.displayName || this.currentUser!.email?.split('@')[0] || 'Anonymous',
              postId: postId,
              parentId: parentId,
              depth: depth,
              upvotes: [],
              score: 0
            };
            
            // Add the reply to the replies collection
            return from(addDoc(collection(this.firestore, 'replies'), newReply)).pipe(
              switchMap(replyDocRef => {
                // Increment the post's reply count
                return from(updateDoc(doc(this.firestore, 'posts', postId), {
                  replyCount: (postData.replyCount || 0) + 1
                })).pipe(
                  map(() => {
                    // Update cache if it exists
                    const cachedReplies = this.repliesCache.get(postId) || [];
                    const replyWithId = { ...newReply, id: replyDocRef.id };
                    this.repliesCache.set(postId, [...cachedReplies, replyWithId]);
                    
                    // Update post's reply count in cache
                    this.updatePostInCache(postId, { replyCount: (postData.replyCount || 0) + 1 });
                    
                    console.log(`Added reply ${replyDocRef.id} to post ${postId}`);
                    return replyDocRef.id;
                  })
                );
              }),
              catchError(error => {
                console.error('Error adding reply:', error);
                return throwError(() => new Error('Failed to add reply: ' + error.message));
              })
            );
          })
        );
      })
    );
  }
  
  // Helper method to update a post in the cache
  private updatePostInCache(postId: string, update: Partial<Post>): void {
    // Update in the main posts subject
    const posts = this.postsSubject.value;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, ...update };
      }
      return post;
    });
    this.postsSubject.next(updatedPosts);
    
    // Update in each relevant cache entry
    for (const [key, cachedPosts] of this.postsCache.entries()) {
      const postIndex = cachedPosts.findIndex(p => p.id === postId);
      if (postIndex !== -1) {
        const updatedCachedPosts = [...cachedPosts];
        updatedCachedPosts[postIndex] = { ...updatedCachedPosts[postIndex], ...update };
        this.postsCache.set(key, updatedCachedPosts);
      }
    }
  }

  // Toggle upvote on a post
  async upvotePost(postId: string, isUpvote: boolean = true): Promise<void> {
    if (!this.currentUser) {
      throw new Error('You must be logged in to vote');
    }

    try {
      const postRef = doc(this.firestore, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data() as Post;
        const userId = this.currentUser.uid;
        const upvotes = postData.upvotes || [];
        const hasUpvoted = upvotes.includes(userId);

        if (isUpvote && !hasUpvoted) {
          // Add upvote
          await updateDoc(postRef, {
            upvotes: arrayUnion(userId),
            score: (postData.score || 0) + 1
          });
          
          // Update cache
          this.updatePostInCache(postId, {
            upvotes: [...upvotes, userId],
            score: (postData.score || 0) + 1
          });
          
        } else if (!isUpvote && hasUpvoted) {
          // Remove upvote
          await updateDoc(postRef, {
            upvotes: arrayRemove(userId),
            score: Math.max((postData.score || 0) - 1, 0)
          });
          
          // Update cache
          this.updatePostInCache(postId, {
            upvotes: upvotes.filter(id => id !== userId),
            score: Math.max((postData.score || 0) - 1, 0)
          });
        }
      }
    } catch (error) {
      console.error(`Error upvoting post ${postId}:`, error);
      throw error;
    }
  }

  // Toggle upvote on a reply
  async upvoteReply(replyId: string, isUpvote: boolean = true): Promise<void> {
    if (!this.currentUser) {
      throw new Error('You must be logged in to vote');
    }

    try {
      const replyRef = doc(this.firestore, 'replies', replyId);
      const replySnap = await getDoc(replyRef);
      
      if (replySnap.exists()) {
        const replyData = replySnap.data() as Reply;
        const userId = this.currentUser.uid;
        const upvotes = replyData.upvotes || [];
        const hasUpvoted = upvotes.includes(userId);
        const postId = replyData.postId;

        if (isUpvote && !hasUpvoted) {
          // Add upvote
          await updateDoc(replyRef, {
            upvotes: arrayUnion(userId),
            score: (replyData.score || 0) + 1
          });
          
          // Update cache if it exists
          if (this.repliesCache.has(postId)) {
            const replies = this.repliesCache.get(postId)!;
            const updatedReplies = replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  upvotes: [...upvotes, userId],
                  score: (replyData.score || 0) + 1
                };
              }
              return reply;
            });
            this.repliesCache.set(postId, updatedReplies);
          }
          
        } else if (!isUpvote && hasUpvoted) {
          // Remove upvote
          await updateDoc(replyRef, {
            upvotes: arrayRemove(userId),
            score: Math.max((replyData.score || 0) - 1, 0)
          });
          
          // Update cache if it exists
          if (this.repliesCache.has(postId)) {
            const replies = this.repliesCache.get(postId)!;
            const updatedReplies = replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  upvotes: upvotes.filter(id => id !== userId),
                  score: Math.max((replyData.score || 0) - 1, 0)
                };
              }
              return reply;
            });
            this.repliesCache.set(postId, updatedReplies);
          }
        }
      }
    } catch (error) {
      console.error(`Error upvoting reply ${replyId}:`, error);
      throw error;
    }
  }

  // Check if current user has upvoted a post
  async hasUpvotedPost(postId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      // Check cache first
      const cachedPosts = this.postsSubject.value;
      const cachedPost = cachedPosts.find(p => p.id === postId);
      
      if (cachedPost) {
        return (cachedPost.upvotes || []).includes(this.currentUser.uid);
      }
      
      // If not in cache, fetch from Firestore
      const postRef = doc(this.firestore, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        const postData = postSnap.data() as Post;
        const upvotes = postData.upvotes || [];
        return upvotes.includes(this.currentUser.uid);
      }
      
      return false;
    } catch (error) {
      console.error(`Error checking upvote for post ${postId}:`, error);
      return false;
    }
  }

  // Check if current user has upvoted a reply
  async hasUpvotedReply(replyId: string): Promise<boolean> {
    if (!this.currentUser) return false;
    
    try {
      // Check cache first for this reply
      for (const [postId, replies] of this.repliesCache.entries()) {
        const cachedReply = replies.find(r => r.id === replyId);
        if (cachedReply) {
          return (cachedReply.upvotes || []).includes(this.currentUser.uid);
        }
      }
      
      // If not in cache, fetch from Firestore
      const replyRef = doc(this.firestore, 'replies', replyId);
      const replySnap = await getDoc(replyRef);
      
      if (replySnap.exists()) {
        const replyData = replySnap.data() as Reply;
        const upvotes = replyData.upvotes || [];
        return upvotes.includes(this.currentUser.uid);
      }
      
      return false;
    } catch (error) {
      console.error(`Error checking upvote for reply ${replyId}:`, error);
      return false;
    }
  }

  // Format Firebase timestamp or Date object to Date
  formatDate(timestamp: Date | Timestamp): Date {
    if (timestamp && typeof (timestamp as any).toDate === 'function') {
      return (timestamp as any).toDate();
    }
    return timestamp as Date;
  }

  // Helper method to get formatted date from a potential Firebase timestamp
  getDateFromTimestamp(timestamp: any): Date {
    if (timestamp && typeof timestamp.toDate === 'function') {
      return timestamp.toDate();
    }
    return timestamp;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }
  
  // Search communities by name or description
  searchCommunities(query: string): Observable<Community[]> {
    if (!query || query.trim() === '') {
      return this.getCommunities();
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return this.getCommunities().pipe(
      map(communities => {
        return communities.filter(community => {
          return community.name.toLowerCase().includes(searchTerm) || 
                 community.description.toLowerCase().includes(searchTerm);
        });
      })
    );
  }
}
