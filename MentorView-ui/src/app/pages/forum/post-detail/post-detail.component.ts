import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ForumService, Post, Reply, SortOption } from '../../../services/forum.service';
import { Auth, User } from '@angular/fire/auth';
import { CommunitySidebarComponent } from '../../../components/community-sidebar/community-sidebar.component';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CommunitySidebarComponent]
})
export class PostDetailComponent implements OnInit {
  postId: string;
  post$: Observable<Post | null>;
  replies$: Observable<Reply[]>;
  currentUser: User | null = null;
  newReply = '';
  parentReplyId: string | undefined;
  replyingToUsername: string | undefined;
  isLoading = true;
  loadingError = false;
  
  // For reply sorting
  currentSort: SortOption = SortOption.Best;
  sortOptions = SortOption;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private auth: Auth
  ) {
    this.postId = '';
    this.post$ = of(null);
    this.replies$ = of([]);
  }

  ngOnInit(): void {
    // Get the current logged in user
    this.currentUser = this.forumService.getCurrentUser();
    
    // Get the post ID from the route
    this.route.paramMap.pipe(
      map(params => params.get('id') || '')
    ).subscribe(id => {
      if (id) {
        this.postId = id;
        this.loadPostAndReplies();
      } else {
        this.router.navigate(['/forum']);
      }
    });
  }

  // Safe method to format timestamps for templates
  formatDate(timestamp: any): string {
    if (!timestamp) return '';
    
    // Handle Firebase Timestamp objects
    if (timestamp && typeof timestamp.toDate === 'function') {
      const date = timestamp.toDate();
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
    
    // Handle regular Date objects
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString();
    }
    
    // Default fallback
    return '';
  }

  loadPostAndReplies(): void {
    this.isLoading = true;
    this.loadingError = false;
    
    // Load the post
    this.post$ = this.forumService.getPost(this.postId).pipe(
      tap(post => {
        this.isLoading = false;
        if (!post) {
          this.loadingError = true;
          console.error('Post not found');
        }
      }),
      catchError(error => {
        this.isLoading = false;
        this.loadingError = true;
        console.error('Error loading post:', error);
        return of(null);
      })
    );
    
    // Load replies
    this.loadReplies();
  }

  loadReplies(): void {
    this.replies$ = this.forumService.getReplies(this.postId, this.currentSort).pipe(
      catchError(error => {
        console.error('Error loading replies:', error);
        return of([]);
      })
    );
  }

  startReply(parentId?: string, username?: string): void {
    if (!this.currentUser) {
      alert('You must be logged in to reply');
      return;
    }
    
    this.parentReplyId = parentId;
    this.replyingToUsername = username;
    
    // Scroll to reply form
    setTimeout(() => {
      const replyForm = document.getElementById('reply-form');
      if (replyForm) {
        replyForm.scrollIntoView({ behavior: 'smooth' });
        const replyInput = document.getElementById('reply-input');
        if (replyInput) {
          replyInput.focus();
        }
      }
    }, 100);
  }

  cancelReply(): void {
    this.parentReplyId = undefined;
    this.replyingToUsername = undefined;
    this.newReply = '';
  }

  submitReply(): void {
    if (!this.currentUser) {
      alert('You must be logged in to reply');
      return;
    }
    
    if (!this.newReply.trim()) {
      alert('Reply content cannot be empty');
      return;
    }
    
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) loadingIndicator.style.display = 'block';
    
    // Store reply content and parent ID before clearing the form
    const replyContent = this.newReply.trim();
    const parentId = this.parentReplyId;
    
    // Clear form immediately for better UX
    this.cancelReply();
    
    this.forumService.addReply(this.postId, replyContent, parentId).subscribe({
      next: () => {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        // Reload replies to include the new one
        this.loadReplies();
      },
      error: (error) => {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        console.error('Error submitting reply:', error);
        alert('Failed to submit reply: ' + error.message);
      }
    });
  }

  changeSortOption(sort: SortOption): void {
    this.currentSort = sort;
    this.loadReplies();
  }

  getReplyDepthClass(depth: number | undefined): string {
    if (depth === undefined) return 'depth-0';
    // Limit depth for display purposes
    const clampedDepth = Math.min(depth, 5);
    return `depth-${clampedDepth}`;
  }

  async upvotePost(post: Post, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to vote');
      return;
    }
    
    try {
      const hasUpvoted = post.upvotes?.includes(this.currentUser.uid) || false;
      await this.forumService.upvotePost(post.id!, !hasUpvoted);
      // Reload the post to reflect the updated score
      this.loadPostAndReplies();
    } catch (error) {
      console.error('Error upvoting post:', error);
      alert('Failed to vote: ' + (error as Error).message);
    }
  }

  async upvoteReply(reply: Reply, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to vote');
      return;
    }
    
    try {
      const hasUpvoted = reply.upvotes?.includes(this.currentUser.uid) || false;
      await this.forumService.upvoteReply(reply.id!, !hasUpvoted);
      // Reload replies to reflect updated scores
      this.loadReplies();
    } catch (error) {
      console.error('Error upvoting reply:', error);
      alert('Failed to vote: ' + (error as Error).message);
    }
  }
}
