import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ForumService, Post, SortOption } from '../../services/forum.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe]
})
export class ForumComponent implements OnInit {
  posts$: Observable<Post[]>;
  newPost = {
    title: '',
    content: ''
  };
  currentUser: User | null = null;
  showNewPostForm = false;
  currentSort: SortOption = SortOption.Newest;
  sortOptions = SortOption;

  constructor(
    private forumService: ForumService, 
    private auth: Auth,
    private router: Router
  ) {
    this.posts$ = of([]);
  }

  ngOnInit(): void {
    // Subscribe to post updates
    this.loadPosts();
    
    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  loadPosts(): void {
    this.posts$ = this.forumService.getPosts(this.currentSort);
  }

  toggleNewPostForm(): void {
    this.showNewPostForm = !this.showNewPostForm;
  }

  submitPost(): void {
    if (!this.currentUser) {
      alert('You must be logged in to create a post.');
      return;
    }

    if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
      alert('Post title and content are required.');
      return;
    }

    this.forumService.createPost(this.newPost).subscribe({
      next: () => {
        // Reset the form
        this.newPost = {
          title: '',
          content: ''
        };
        this.showNewPostForm = false;
        
        // Reload posts to show the new one
        this.loadPosts();
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('An error occurred while creating your post.');
      }
    });
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

  viewPost(postId: string): void {
    this.router.navigate(['/forum', postId]);
  }

  cancelPost(): void {
    this.newPost = {
      title: '',
      content: ''
    };
    this.showNewPostForm = false;
  }

  changeSortOption(sort: SortOption): void {
    this.currentSort = sort;
    this.loadPosts();
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
