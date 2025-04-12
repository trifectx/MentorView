import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ForumService, Community } from '../../../services/forum.service';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TimeAgoPipe]
})
export class CommunityListComponent implements OnInit {
  communities$: Observable<Community[]>;
  currentUser: User | null = null;
  showNewCommunityForm = false;
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
    this.communities$ = of([]);
  }

  ngOnInit(): void {
    // Load communities
    this.communities$ = this.forumService.getCommunities();
    
    // Get current user
    this.currentUser = this.forumService.getCurrentUser();
  }

  toggleNewCommunityForm(): void {
    this.showNewCommunityForm = !this.showNewCommunityForm;
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
        // Reset the form
        this.newCommunity = {
          name: '',
          description: '',
          isPrivate: false
        };
        this.showNewCommunityForm = false;
        
        // Navigate to the new community
        this.router.navigate(['/forum/community', communityId]);
      },
      error: (error) => {
        console.error('Error creating community:', error);
        alert('An error occurred while creating the community: ' + error.message);
      }
    });
  }

  cancelCommunity(): void {
    this.newCommunity = {
      name: '',
      description: '',
      isPrivate: false
    };
    this.showNewCommunityForm = false;
  }

  viewCommunity(communityId: string): void {
    this.router.navigate(['/forum/community', communityId]);
  }

  async joinCommunity(communityId: string, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.currentUser) {
      alert('You must be logged in to join a community.');
      return;
    }

    try {
      await this.forumService.joinCommunity(communityId);
    } catch (error) {
      console.error('Error joining community:', error);
      alert('An error occurred while joining the community.');
    }
  }

  // Format date helper
  formatDate(timestamp: any): Date {
    return this.forumService.formatDate(timestamp);
  }
}
