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
  arrayRemove
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
  createdAt: Date | Timestamp;
  userId: string;
  userName: string;
  parentId?: string; // For replies to replies (null or undefined if direct reply to post)
  postId: string; // ID of the post this reply belongs to
  depth: number; // Depth level of the reply (0 for direct replies to post, 1+ for nested replies)
  upvotes: string[]; // Array of user IDs who upvoted
  score: number; // Net score (upvotes count)
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

    const newCommunity: Community = {
      ...community,
      createdAt: new Date(),
      createdBy: this.currentUser.uid,
      creatorName: this.currentUser.displayName || 'Anonymous',
      memberCount: 1, // Creator is the first member
      members: [this.currentUser.uid],
      moderators: [this.currentUser.uid], // Creator is the first moderator
      isPrivate: community.isPrivate || false
    };

    return from(addDoc(collection(this.firestore, 'communities'), newCommunity)).pipe(
      map(docRef => {
        // Update our cache with the new community
        const communities = this.communitiesSubject.value;
        const newCommunityWithId = { ...newCommunity, id: docRef.id };
        this.communitiesSubject.next([
          newCommunityWithId,
          ...communities
        ]);
        
        // Update the cache
        const cachedCommunities = this.communitiesCache.get('all') || [];
        this.communitiesCache.set('all', [newCommunityWithId, ...cachedCommunities]);
        
        return docRef.id;
      }),
      catchError(error => {
        console.error('Error creating community:', error);
        return throwError(() => new Error('Failed to create community'));
      })
    );
  }
  
  // Join a community (become a member)
  async joinCommunity(communityId: string): Promise<void> {
    if (!this.currentUser) {
      throw new Error('You must be logged in to join a community');
    }
    
    try {
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (communitySnap.exists()) {
        const communityData = communitySnap.data() as Community;
        const members = communityData.members || [];
        
        if (!members.includes(this.currentUser.uid)) {
          // Add user to members and increment count
          await updateDoc(communityRef, {
            members: arrayUnion(this.currentUser.uid),
            memberCount: (communityData.memberCount || 0) + 1
          });
          
          // Update cache
          this.updateCommunityInCache(communityId, {
            members: [...members, this.currentUser.uid],
            memberCount: (communityData.memberCount || 0) + 1
          });
        }
      }
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
      const communityRef = doc(this.firestore, 'communities', communityId);
      const communitySnap = await getDoc(communityRef);
      
      if (communitySnap.exists()) {
        const communityData = communitySnap.data() as Community;
        const members = communityData.members || [];
        
        if (members.includes(this.currentUser.uid)) {
          // Remove user from members and decrement count
          await updateDoc(communityRef, {
            members: arrayRemove(this.currentUser.uid),
            memberCount: Math.max((communityData.memberCount || 0) - 1, 0)
          });
          
          // Remove from moderators if they are one
          const moderators = communityData.moderators || [];
          if (moderators.includes(this.currentUser.uid)) {
            await updateDoc(communityRef, {
              moderators: arrayRemove(this.currentUser.uid)
            });
          }
          
          // Update cache
          this.updateCommunityInCache(communityId, {
            members: members.filter(uid => uid !== this.currentUser?.uid),
            memberCount: Math.max((communityData.memberCount || 0) - 1, 0),
            moderators: moderators.filter(uid => uid !== this.currentUser?.uid)
          });
        }
      }
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

  // Get a single post by ID
  getPost(postId: string): Observable<Post | null> {
    // Check cache first
    const cachedPosts = this.postsCache.get('all');
    if (cachedPosts) {
      const cachedPost = cachedPosts.find(p => p.id === postId);
      if (cachedPost) {
        return of(cachedPost);
      }
    }
    
    // If not in cache, fetch from Firestore
    const postDoc = doc(this.firestore, 'posts', postId);
    return from(getDoc(postDoc)).pipe(
      map(postSnap => {
        if (postSnap.exists()) {
          const data = postSnap.data() as Post;
          // Convert timestamp if needed
          if (data.createdAt && typeof (data.createdAt as any).toDate === 'function') {
            data.createdAt = (data.createdAt as any).toDate();
          }
          // Default upvotes and score if not present
          data.upvotes = data.upvotes || [];
          data.score = data.score || 0;
          return { ...data, id: postSnap.id };
        }
        return null;
      }),
      catchError(error => {
        console.error(`Error fetching post ${postId}:`, error);
        return of(null);
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
    
    // Get the community information first
    return this.getCommunity(communityId).pipe(
      switchMap(community => {
        if (!community) {
          return throwError(() => new Error('Community not found'));
        }
        
        // Check if user is a member if the community is private
        if (community.isPrivate) {
          const isMember = (community.members || []).includes(this.currentUser!.uid);
          if (!isMember) {
            return throwError(() => new Error('You must be a member of this community to post'));
          }
        }
        
        const newPost: Post = {
          ...post,
          createdAt: new Date(),
          userId: this.currentUser.uid,
          userName: this.currentUser.displayName || 'Anonymous',
          replyCount: 0,
          upvotes: [],
          score: 0,
          communityId: communityId,
          communityName: community.name
        };

        return from(addDoc(collection(this.firestore, 'posts'), newPost)).pipe(
          map(docRef => {
            // Update our cache with the new post
            const posts = this.postsSubject.value;
            const newPostWithId = { ...newPost, id: docRef.id };
            this.postsSubject.next([
              newPostWithId,
              ...posts
            ]);
            
            // Update community posts cache if it exists
            const cachedCommunityPosts = this.postsCache.get(`community_${communityId}`);
            if (cachedCommunityPosts) {
              this.postsCache.set(`community_${communityId}`, [
                newPostWithId,
                ...cachedCommunityPosts
              ]);
            }
            
            // Update all posts cache
            const cachedAllPosts = this.postsCache.get('all') || [];
            this.postsCache.set('all', [newPostWithId, ...cachedAllPosts]);
            
            return docRef.id;
          }),
          catchError(error => {
            console.error('Error creating post:', error);
            return throwError(() => new Error('Failed to create post'));
          })
        );
      }),
      catchError(error => {
        console.error('Error creating post:', error);
        return throwError(() => error.message || 'Failed to create post');
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
    
    return collectionData(repliesQuery, { idField: 'id' }).pipe(
      map(replies => {
        // Normalize the replies
        const normalizedReplies = replies.map(reply => {
          // Convert timestamp if needed
          if (reply['createdAt'] && typeof (reply['createdAt'] as any).toDate === 'function') {
            reply['createdAt'] = (reply['createdAt'] as any).toDate();
          }
          
          return {
            ...reply,
            upvotes: reply['upvotes'] || [],
            score: reply['score'] || 0,
            depth: reply['depth'] !== undefined ? reply['depth'] : reply['parentId'] ? 1 : 0
          };
        }) as Reply[];
        
        // Cache the replies
        this.repliesCache.set(postId, normalizedReplies);
        
        // Sort and return
        return this.sortReplies(normalizedReplies, sortOption);
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
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.formatDate(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.formatDate(b['createdAt']);
          return dateB.getTime() - dateA.getTime(); // Newest first
        });
      case SortOption.Oldest:
        return replies.sort((a, b) => {
          const dateA = a['createdAt'] instanceof Date ? a['createdAt'] : this.formatDate(a['createdAt']);
          const dateB = b['createdAt'] instanceof Date ? b['createdAt'] : this.formatDate(b['createdAt']);
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
  addReply(
    postId: string, 
    content: string, 
    parentId?: string
  ): Observable<string> {
    if (!this.currentUser) {
      return throwError(() => new Error('You must be logged in to reply'));
    }

    // Determine depth based on parent
    let depth = 0;
    
    const getParentDepthPromise = parentId ? 
      getDoc(doc(this.firestore, 'replies', parentId)).then(parentDoc => {
        if (parentDoc.exists()) {
          const parentData = parentDoc.data() as Reply;
          // Child depth is parent depth + 1
          return (parentData.depth !== undefined ? parentData.depth : 0) + 1;
        }
        return 0;
      }) : 
      Promise.resolve(0); // Direct replies to post have depth 0

    return from(getParentDepthPromise).pipe(
      switchMap(replyDepth => {
        const reply: Reply = {
          content,
          createdAt: new Date(),
          userId: this.currentUser!.uid,
          userName: this.currentUser!.displayName || 'Anonymous',
          postId,
          depth: replyDepth,
          upvotes: [],
          score: 0
        };

        if (parentId) {
          reply.parentId = parentId;
        }

        return from(addDoc(collection(this.firestore, 'replies'), reply));
      }),
      switchMap(docRef => {
        // Update the post's reply count
        const postRef = doc(this.firestore, 'posts', postId);
        return from(
          getDoc(postRef).then(postSnap => {
            if (postSnap.exists()) {
              const postData = postSnap.data() as Post;
              return updateDoc(postRef, {
                replyCount: (postData.replyCount || 0) + 1
              });
            }
            return Promise.resolve(); // Ensure all code paths return a value
          })
        ).pipe(
          map(() => {
            // Clear replies cache for this post
            this.repliesCache.delete(postId);
            
            // Update posts cache
            const allPosts = this.postsSubject.value;
            const updatedPosts = allPosts.map(p => {
              if (p.id === postId) {
                return { ...p, replyCount: p.replyCount + 1 };
              }
              return p;
            });
            this.postsSubject.next(updatedPosts);
            
            return docRef.id;
          })
        );
      }),
      catchError(error => {
        console.error('Error adding reply:', error);
        return throwError(() => new Error('Failed to add reply'));
      })
    );
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

  // Update a post in the cache
  private updatePostInCache(postId: string, update: Partial<Post>): void {
    const allPosts = this.postsSubject.value;
    const updatedPosts = allPosts.map(post => {
      if (post.id === postId) {
        return { ...post, ...update };
      }
      return post;
    });
    this.postsSubject.next(updatedPosts);
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

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
