import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FriendService, FriendRequest } from '../../services/friend.service';
import { Auth, User } from '@angular/fire/auth';
import { Observable, Subscription, map } from 'rxjs';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {
  private auth = inject(Auth);
  private friendService = inject(FriendService);

  currentUser: User | null = null;
  users$: Observable<User[]>;
  friends$: Observable<User[]>;
  pendingRequests$: Observable<FriendRequest[]>;
  sentRequests$: Observable<FriendRequest[]>;
  
  // Track friends and sent requests to check status
  private friendsList: User[] = [];
  private sentRequestsList: FriendRequest[] = [];
  private subscriptions: Subscription[] = [];

  activeTab: 'allUsers' | 'friends' | 'requests' = 'allUsers';
  isLoading = true;

  constructor() {
    this.users$ = this.friendService.users$;
    this.friends$ = this.friendService.friends$;
    this.pendingRequests$ = this.friendService.getPendingRequests();
    this.sentRequests$ = this.friendService.getSentRequests();
    
    // Subscribe to keep lists updated
    this.subscriptions.push(
      this.friends$.subscribe(friends => {
        this.friendsList = friends;
      })
    );
    
    this.subscriptions.push(
      this.friendService.getSentRequests().subscribe(requests => {
        this.sentRequestsList = requests;
      })
    );
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeTab(tab: 'allUsers' | 'friends' | 'requests'): void {
    this.activeTab = tab;
  }

  sendFriendRequest(userId: string): void {
    this.friendService.sendFriendRequest(userId).subscribe(() => {
      // Request sent successfully
    });
  }

  acceptRequest(requestId: string): void {
    this.friendService.acceptFriendRequest(requestId).subscribe(() => {
      // Request accepted successfully
    });
  }

  rejectRequest(requestId: string): void {
    this.friendService.rejectFriendRequest(requestId).subscribe(() => {
      // Request rejected successfully
    });
  }

  removeFriend(friendId: string): void {
    this.friendService.removeFriend(friendId).subscribe(() => {
      // Friend removed successfully
      console.log('Friend removed successfully');
    }, error => {
      console.error('Error removing friend:', error);
    });
  }

  isFriendRequestSent(userId: string): boolean {
    // Use stored list instead of creating new subscription each time
    return this.sentRequestsList.some(r => r.receiverId === userId && r.status === 'pending');
  }

  isFriend(userId: string): boolean {
    // Use stored list instead of creating new subscription each time
    return this.friendsList.some(f => f.uid === userId);
  }
}
