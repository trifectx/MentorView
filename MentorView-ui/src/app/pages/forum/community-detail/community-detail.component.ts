import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of, switchMap, take, firstValueFrom } from 'rxjs';
import { ForumService, Community, Post, SortOption } from '../../../services/forum.service';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { CommunitySidebarComponent } from '../../../components/community-sidebar/community-sidebar.component';

@Component({
  selector: 'app-community-detail',
  templateUrl: './community-detail.component.html',
  styleUrls: ['./community-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe, CommunitySidebarComponent]
})
export class CommunityDetailComponent implements OnInit {
  communityId: string;
  community$: Observable<Community | undefined>;
  posts$: Observable<Post[]>;
  currentUser: User | null = null;
  showNewPostForm = false;
  isMember = false;
  isModerator = false;
  currentSort: SortOption = SortOption.Newest;
  sortOptions = SortOption;

  // New post form data
  newPost: {
    title: string;
    content: string;
    communityId?: string;
  } = {
    title: '',
    content: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private auth: Auth
  ) {
    this.community$ = of(null);
    this.posts$ = of([]);
  }

  ngOnInit(): void {
    // Get community ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.communityId = id;
        this.loadCommunity();
        this.loadPosts();
        this.checkMembership();
      }
    });

    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  loadCommunity(): void {
    this.community$ = this.forumService.getCommunity(this.communityId);
  }

  loadPosts(): void {
    this.posts$ = this.forumService.getPostsForCommunity(this.communityId, this.currentSort);
  }

  async checkMembership(): Promise<void> {
    if (this.currentUser) {
      this.isMember = await this.forumService.isCommunityMember(this.communityId);
      this.isModerator = await this.forumService.isCommunityModerator(this.communityId);
    }
  }

  toggleNewPostForm(): void {
    this.showNewPostForm = !this.showNewPostForm;
  }

  submitPost(): void {
    if (!this.currentUser) {
      this.showError('You must be logged in to post');
      return;
    }

    if (!this.newPost.title.trim()) {
      this.showError('Title is required');
      return;
    }

    const loading = document.getElementById('loading-indicator');
    if (loading) loading.style.display = 'block';

    // Create a local copy of the post data to avoid reference issues
    const postData = {
      title: this.newPost.title.trim(),
      content: this.newPost.content.trim(),
      communityId: this.communityId
    };

    // Clear the form immediately to give user feedback
    this.resetPostForm();

    // Create post with timeout
    const postRequest = this.forumService.createPost(this.communityId, postData);
    
    // Set a timeout for the request
    const timeout = 10000; // 10 seconds
    
    setTimeout(() => {
      if (loading) loading.style.display = 'none';
    }, timeout);
    
    // Use firstValueFrom instead of toPromise()
    firstValueFrom(postRequest)
      .then((postId: string) => {
        if (loading) loading.style.display = 'none';
        console.log('Post created successfully:', postId);
        
        // Show success message
        this.showSuccess('Post created successfully!');
        
        // Refresh posts
        this.loadPosts();
      })
      .catch(error => {
        if (loading) loading.style.display = 'none';
        console.error('Error creating post:', error);
        this.showError('Failed to create post: ' + (error.message || 'Unknown error'));
      });
  }

  // Reset the post form
  private resetPostForm(): void {
    this.newPost = {
      title: '',
      content: ''
    };
  }

  // Show error message
  private showError(message: string): void {
    // You can implement this with a proper toast/notification component
    alert(message);
  }

  // Show success message
  private showSuccess(message: string): void {
    // You can implement this with a proper toast/notification component
    alert(message);
  }

  cancelPost(): void {
    this.newPost = {
      title: '',
      content: ''
    };
    this.showNewPostForm = false;
  }

  viewPost(postId: string): void {
    this.router.navigate(['/forum/post', postId]);
  }

  async joinCommunity(): Promise<void> {
    if (!this.currentUser) {
      alert('You must be logged in to join a community.');
      return;
    }

    try {
      await this.forumService.joinCommunity(this.communityId);
      this.isMember = true;
      // Reload the community to update member count
      this.loadCommunity();
    } catch (error) {
      console.error('Error joining community:', error);
      alert('An error occurred while joining the community.');
    }
  }

  async leaveCommunity(): Promise<void> {
    if (!this.currentUser) {
      alert('You must be logged in to leave a community.');
      return;
    }

    try {
      await this.forumService.leaveCommunity(this.communityId);
      this.isMember = false;
      this.isModerator = false;
      // Reload the community to update member count
      this.loadCommunity();
    } catch (error) {
      console.error('Error leaving community:', error);
      alert('An error occurred while leaving the community.');
    }
  }

  changeSortOption(sort: SortOption): void {
    this.currentSort = sort;
    this.loadPosts();
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
