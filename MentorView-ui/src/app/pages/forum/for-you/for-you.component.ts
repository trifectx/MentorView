import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ForumService, Post, SortOption } from '../../../services/forum.service';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { CommunitySidebarComponent } from '../../../components/community-sidebar/community-sidebar.component';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe, CommunitySidebarComponent]
})
export class ForYouComponent implements OnInit {
  posts$: Observable<Post[]>;
  currentUser: User | null = null;
  currentSort: SortOption = SortOption.Newest;
  sortOptions = SortOption;
  
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
  }

  ngOnInit(): void {
    // Subscribe to post updates for joined communities
    this.loadPosts();
    
    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  loadPosts(): void {
    this.posts$ = this.forumService.getForYouPosts(this.currentSort);
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
}
