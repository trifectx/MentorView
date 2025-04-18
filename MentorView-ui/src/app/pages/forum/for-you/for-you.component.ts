import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ForumService, Post, SortOption, Community } from '../../../services/forum.service';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { CommunitySidebarComponent } from '../../../components/community-sidebar/community-sidebar.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe, CommunitySidebarComponent, NavbarComponent]
})
export class ForYouComponent implements OnInit {
  posts$: Observable<Post[]>;
  communities$: Observable<Community[]>;
  filteredCommunities$: Observable<Community[]>;
  allCommunities: Community[] = [];
  currentUser: User | null = null;
  currentSort: SortOption = SortOption.Newest;
  sortOptions = SortOption;
  searchQuery: string = '';
  loading: boolean = true;
  communityMemberships: Map<string, boolean> = new Map();
  
  // Community form state
  showCreateCommunityForm = false;
  newCommunity = {
    name: '',
    description: '',
    isPrivate: false
  };

  constructor(
    private forumService: ForumService, 
    private auth: Auth,
    private router: Router
  ) {
    this.posts$ = of([]);
    this.communities$ = of([]);
    this.filteredCommunities$ = of([]);
  }

  ngOnInit(): void {
    // Subscribe to post updates for joined communities
    this.loadPosts();
    
    // Load communities for search
    this.loadCommunities();
    
    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  loadPosts(): void {
    this.loading = true;
    this.posts$ = this.forumService.getForYouPosts(this.currentSort).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }
  
  loadCommunities(): void {
    this.loading = true;
    this.communities$ = this.forumService.getCommunities().pipe(
      tap(communities => {
        this.allCommunities = communities;
        this.loading = false;
        
        // Check membership status for each community
        if (this.currentUser) {
          communities.forEach(community => {
            this.checkMembership(community.id!);
          });
        }
      })
    );
    
    // Initialize filtered communities with all communities
    this.filteredCommunities$ = this.communities$;
  }
  
  // Check if user is a member of a community
  async checkMembership(communityId: string): Promise<void> {
    if (!this.currentUser) return;
    
    try {
      const isMember = await this.forumService.isCommunityMember(communityId);
      this.communityMemberships.set(communityId, isMember);
    } catch (error) {
      console.error('Error checking membership:', error);
    }
  }

  changeSortOption(sort: SortOption): void {
    this.currentSort = sort;
    this.loadPosts();
  }

  viewPost(postId: string): void {
    this.router.navigate(['/forum/post', postId]);
  }

  async upvotePost(post: Post, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to vote.');
      return;
    }

    try {
      const hasUpvoted = await this.forumService.hasUpvotedPost(post.id!);
      await this.forumService.upvotePost(post.id!, !hasUpvoted);
      // Reload posts to reflect new upvote status
      this.loadPosts();
    } catch (error) {
      console.error('Error upvoting post:', error);
      alert('An error occurred while voting.');
    }
  }

  // Show community form when event received from sidebar
  onShowCreateCommunityForm(): void {
    this.showCreateCommunityForm = true;
  }

  cancelCommunityForm(): void {
    this.showCreateCommunityForm = false;
    this.newCommunity = {
      name: '',
      description: '',
      isPrivate: false
    };
  }

  submitCommunity(): void {
    if (!this.currentUser) {
      alert('You must be logged in to create a community.');
      return;
    }

    if (!this.newCommunity.name.trim() || !this.newCommunity.description.trim()) {
      alert('Community name and description are required.');
      return;
    }

    // Convert the name to a Reddit-style name (lowercase, no spaces, only letters, numbers, and underscores)
    const formattedName = this.newCommunity.name.trim()
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '_');
    
    this.forumService.createCommunity({
      name: formattedName,
      description: this.newCommunity.description.trim(),
      isPrivate: this.newCommunity.isPrivate,
      imageUrl: '',
      bannerUrl: ''
    }).subscribe({
      next: (communityId) => {
        console.log('Community created successfully with ID:', communityId);
        // Reset the form
        this.newCommunity = {
          name: '',
          description: '',
          isPrivate: false
        };
        this.showCreateCommunityForm = false;
        
        // Navigate to the new community
        this.router.navigate(['/forum/community', communityId]);
      },
      error: (error) => {
        console.error('Error creating community:', error);
        alert('An error occurred while creating the community: ' + error.message);
      }
    });
  }

  // Helper method to format dates
  formatDate(timestamp: any): Date {
    return this.forumService.formatDate(timestamp);
  }

  // Helper to get upvote status for a post
  hasUserUpvotedPost(post: Post): Promise<boolean> {
    if (!this.currentUser || !post.id) return Promise.resolve(false);
    return this.forumService.hasUpvotedPost(post.id);
  }
  
  // Search communities by name or description
  searchCommunities(): void {
    if (!this.searchQuery.trim()) {
      // If search query is empty, show all communities
      this.filteredCommunities$ = this.communities$;
      return;
    }
    
    // Use the ForumService to search communities
    this.loading = true;
    this.filteredCommunities$ = this.forumService.searchCommunities(this.searchQuery).pipe(
      tap(() => {
        this.loading = false;
      })
    );
  }
  
  // Clear search
  clearSearch(): void {
    this.searchQuery = '';
    this.filteredCommunities$ = this.communities$;
  }
  
  // View community details
  viewCommunity(communityId: string): void {
    this.router.navigate(['/forum/community', communityId]);
  }
  
  // Join a community
  async joinCommunity(communityId: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to join a community.');
      return;
    }
    
    try {
      await this.forumService.joinCommunity(communityId);
      this.communityMemberships.set(communityId, true);
    } catch (error) {
      console.error('Error joining community:', error);
      alert('An error occurred while joining the community.');
    }
  }
  
  // Leave a community
  async leaveCommunity(communityId: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) return;
    
    try {
      await this.forumService.leaveCommunity(communityId);
      this.communityMemberships.set(communityId, false);
    } catch (error) {
      console.error('Error leaving community:', error);
      alert('An error occurred while leaving the community.');
    }
  }
  
  // Check if user is a member of a community
  isMember(community: Community): boolean {
    return this.communityMemberships.get(community.id!) || false;
  }
}
