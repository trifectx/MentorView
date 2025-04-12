import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of, map } from 'rxjs';
import { ForumService, Post, Reply, NestedReply, SortOption } from '../../../services/forum.service';
import { Firestore, deleteDoc, doc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe]
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post: Post | null = null;
  replies$: Observable<Reply[]>;
  nestedReplies$: Observable<NestedReply[]>;
  newReply: string = '';
  replyingTo: string | null = null; // ID of the reply being replied to (null means replying to the post)
  currentUser: User | null = null;
  replyingToName: string = '';
  currentSort: SortOption = SortOption.Best;
  sortOptions = SortOption;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private forumService: ForumService,
    private auth: Auth,
    private firestore: Firestore
  ) {
    // Initialize with empty observable, we'll update it in ngOnInit
    this.replies$ = of([]);
    this.nestedReplies$ = of([]);
  }

  ngOnInit(): void {
    // Get post ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.postId = id;
        this.loadPost();
        this.loadReplies();
      }
    });

    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  loadPost(): void {
    this.forumService.getPost(this.postId).subscribe({
      next: (post) => {
        this.post = post;
      },
      error: (error) => {
        console.error('Error loading post:', error);
      }
    });
  }

  loadReplies(): void {
    // Load both flat and nested replies
    this.replies$ = this.forumService.getReplies(this.postId, this.currentSort);
    this.nestedReplies$ = this.forumService.getNestedReplies(this.postId, this.currentSort);
  }

  startReply(replyId: string | null = null, userName: string = ''): void {
    this.replyingTo = replyId;
    this.replyingToName = userName;
    // Scroll to reply form
    setTimeout(() => {
      document.getElementById('reply-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  cancelReply(): void {
    this.replyingTo = null;
    this.replyingToName = '';
    this.newReply = '';
  }

  submitReply(): void {
    if (!this.currentUser) {
      alert('You must be logged in to reply.');
      return;
    }

    if (!this.newReply.trim()) {
      alert('Reply cannot be empty.');
      return;
    }

    this.forumService.addReply(
      this.postId,
      this.newReply.trim(),
      this.replyingTo || undefined
    ).subscribe({
      next: () => {
        // Reset the form
        this.newReply = '';
        this.replyingTo = null;
        this.replyingToName = '';
        
        // Reload the post and replies to get updated data
        this.loadPost();
        this.loadReplies();
      },
      error: (error) => {
        console.error('Error submitting reply:', error);
        alert('An error occurred while submitting your reply.');
      }
    });
  }

  // Delete the current post
  async deletePost(): Promise<void> {
    if (!this.currentUser || !this.post) {
      alert('You must be logged in to delete this post.');
      return;
    }

    // Verify the current user is the owner of the post
    if (this.post.userId !== this.currentUser.uid) {
      alert('You can only delete your own posts.');
      return;
    }

    if (confirm('Are you sure you want to delete this post? All replies will also be deleted. This action cannot be undone.')) {
      try {
        // First, delete all replies to this post
        await this.deleteAllRepliesForPost();
        
        // Then delete the post itself
        await deleteDoc(doc(this.firestore, 'posts', this.postId));
        
        // Navigate back to forum
        this.router.navigate(['/forum']);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post.');
      }
    }
  }

  // Delete a reply
  async deleteReply(replyId: string): Promise<void> {
    if (!this.currentUser) {
      alert('You must be logged in to delete a reply.');
      return;
    }

    // Get the reply to check ownership
    const replyRef = doc(this.firestore, 'replies', replyId);
    
    try {
      // Verify current user is the owner
      this.replies$.pipe(
        map(replies => replies.find(reply => reply.id === replyId))
      ).subscribe(async reply => {
        if (!reply) {
          alert('Reply not found.');
          return;
        }

        if (reply.userId !== this.currentUser?.uid) {
          alert('You can only delete your own replies.');
          return;
        }

        if (confirm('Are you sure you want to delete this reply?')) {
          try {
            // Delete the reply
            await deleteDoc(replyRef);
            
            // Update post's reply count if this is a direct reply to the post
            if (!reply.parentId && this.post) {
              const postRef = doc(this.firestore, 'posts', this.postId);
              // We'll let the UI refresh handle the count update rather than explicit update here
            }
            
            // Reload replies
            this.loadReplies();
            // Reload post to update the reply count
            this.loadPost();
          } catch (error) {
            console.error('Error deleting reply:', error);
            alert('An error occurred while deleting the reply.');
          }
        }
      });
    } catch (error) {
      console.error('Error checking reply:', error);
      alert('An error occurred while checking the reply.');
    }
  }

  // Helper method to delete all replies for a post
  private async deleteAllRepliesForPost(): Promise<void> {
    const repliesRef = collection(this.firestore, 'replies');
    const q = query(repliesRef, where('postId', '==', this.postId));
    
    try {
      const querySnapshot = await getDocs(q);
      const deletePromises: Promise<void>[] = [];
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting replies:', error);
      throw error; // Re-throw to be handled by the caller
    }
  }

  // Helper method to determine if a reply is a direct reply to the post or a reply to another reply
  isDirectReply(reply: Reply): boolean {
    return !reply.parentId;
  }

  // Helper method to get all replies to a specific parent reply
  getRepliesTo(parentId: string): Observable<Reply[]> {
    return this.replies$.pipe(
      map(replies => replies.filter(reply => reply.parentId === parentId))
    );
  }

  // Helper method to format timestamps
  formatDate(timestamp: any): Date {
    return this.forumService.formatDate(timestamp);
  }

  // Change the sort option
  changeSortOption(sort: SortOption): void {
    this.currentSort = sort;
    this.loadReplies();
  }

  // Upvote a post
  async upvotePost(): Promise<void> {
    if (!this.currentUser || !this.post) {
      alert('You must be logged in to vote.');
      return;
    }

    try {
      const hasUpvoted = await this.forumService.hasUpvotedPost(this.postId);
      await this.forumService.upvotePost(this.postId, !hasUpvoted);
      // Reload post to reflect new upvote status
      this.loadPost();
    } catch (error) {
      console.error('Error upvoting post:', error);
      alert('An error occurred while voting.');
    }
  }

  // Upvote a reply
  async upvoteReply(replyId: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to vote.');
      return;
    }

    try {
      const hasUpvoted = await this.forumService.hasUpvotedReply(replyId);
      await this.forumService.upvoteReply(replyId, !hasUpvoted);
      // Reload replies to reflect new upvote status
      this.loadReplies();
    } catch (error) {
      console.error('Error upvoting reply:', error);
      alert('An error occurred while voting.');
    }
  }

  // Check if the current user has upvoted a post
  hasUserUpvotedPost(): Promise<boolean> {
    if (!this.currentUser || !this.postId) return Promise.resolve(false);
    return this.forumService.hasUpvotedPost(this.postId);
  }

  // Check if the current user has upvoted a reply
  hasUserUpvotedReply(replyId: string): Promise<boolean> {
    if (!this.currentUser || !replyId) return Promise.resolve(false);
    return this.forumService.hasUpvotedReply(replyId);
  }
}
