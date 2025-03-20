import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FriendService, FriendRequest } from '../../services/friend.service';
import { Auth, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  private auth = inject(Auth);
  private friendService = inject(FriendService);

  currentUser: User | null = null;
  users$: Observable<User[]>;
  friends$: Observable<User[]>;
  pendingRequests$: Observable<FriendRequest[]>;
  sentRequests$: Observable<FriendRequest[]>;

  activeTab: 'allUsers' | 'friends' | 'requests' = 'allUsers';
  isLoading = true;

  constructor() {
    this.users$ = this.friendService.users$;
    this.friends$ = this.friendService.friends$;
    this.pendingRequests$ = this.friendService.getPendingRequests();
    this.sentRequests$ = this.friendService.getSentRequests();
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      this.currentUser = user;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
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
    });
  }

  isFriendRequestSent(userId: string): boolean {
    let result = false;
    this.friendService.getSentRequests().subscribe(requests => {
      result = requests.some(r => r.receiverId === userId);
    });
    return result;
  }

  isFriend(userId: string): boolean {
    let result = false;
    this.friendService.friends$.subscribe(friends => {
      result = friends.some(f => f.uid === userId);
    });
    return result;
  }
}
