import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForumService, Community } from '../../services/forum.service';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-community-sidebar',
  templateUrl: './community-sidebar.component.html',
  styleUrls: ['./community-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CommunitySidebarComponent implements OnInit {
  @Output() showCreateCommunityForm = new EventEmitter<void>();
  
  userCommunities$: Observable<Community[]>;
  currentUser: User | null = null;
  
  constructor(
    private forumService: ForumService,
    private auth: Auth
  ) {
    this.userCommunities$ = this.forumService.getUserCommunities();
  }

  ngOnInit(): void {
    this.currentUser = this.forumService.getCurrentUser();
  }
  
  onCreateCommunityClick(event: Event): void {
    event.preventDefault();
    // Emit event to parent component to show the form
    this.showCreateCommunityForm.emit();
  }
}
