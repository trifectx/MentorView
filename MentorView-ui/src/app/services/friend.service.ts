import { Injectable, inject } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc, arrayUnion, arrayRemove, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, catchError, from, map, of, switchMap } from 'rxjs';

export interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  
  private _users = new BehaviorSubject<User[]>([]);
  private _friendRequests = new BehaviorSubject<FriendRequest[]>([]);
  private _friends = new BehaviorSubject<User[]>([]);
  private unsubscribeRequests: () => void;

  users$ = this._users.asObservable();
  friendRequests$ = this._friendRequests.asObservable();
  friends$ = this._friends.asObservable();

  constructor() {
    console.log('FriendService initialized');
    // Initialize user listeners when current user changes
    this.auth.onAuthStateChanged(user => {
      console.log('Auth state changed:', user ? user.email : 'No user');
      if (user) {
        this.loadUsers();
        this.loadFriendRequests(user.uid);
        this.loadFriends(user.uid);
      } else {
        this._users.next([]);
        this._friendRequests.next([]);
        this._friends.next([]);
      }
    });
  }

  /**
   * Load all users registered in the system
   */
  private loadUsers() {
    console.log('Loading users...');
    const usersRef = collection(this.firestore, 'users');
    getDocs(usersRef).then(snapshot => {
      console.log('Users snapshot:', snapshot.size);
      const users: User[] = [];
      snapshot.forEach(doc => {
        const userData = doc.data() as User;
        if (userData.uid !== this.auth.currentUser?.uid) {
          users.push(userData);
        }
      });
      this._users.next(users);
      console.log('Users loaded:', users.length);
    }).catch(error => {
      console.error('Error loading users:', error);
    });
  }

  /**
   * Load all friend requests for the current user
   */
  private loadFriendRequests(userId: string) {
    console.log('Loading friend requests for user:', userId);
    const requestsRef = collection(this.firestore, 'friendRequests');
    
    // Get sent requests
    const sentQuery = query(requestsRef, where('senderId', '==', userId));
    // Get received requests
    const receivedQuery = query(requestsRef, where('receiverId', '==', userId));

    // Combine both queries
    Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]).then(([sentSnapshot, receivedSnapshot]) => {
      console.log('Friend requests snapshots:', sentSnapshot.size, receivedSnapshot.size);
      const requests: FriendRequest[] = [];
      
      sentSnapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() } as FriendRequest);
      });
      
      receivedSnapshot.forEach(doc => {
        const request = { id: doc.id, ...doc.data() } as FriendRequest;
        // Avoid duplicates
        if (!requests.some(r => r.id === request.id)) {
          requests.push(request);
        }
      });
      
      this._friendRequests.next(requests);
      console.log('Friend requests loaded:', requests.length);
    }).catch(error => {
      console.error('Error loading friend requests:', error);
    });

    // Clean up any previous listeners
    if (this.unsubscribeRequests) {
      this.unsubscribeRequests();
    }

    // Set up real-time listener for future updates
    try {
      this.unsubscribeRequests = onSnapshot(receivedQuery, snapshot => {
        if (snapshot.docChanges().length > 0) {
          // Instead of calling loadFriendRequests again (which was causing the infinite loop),
          // just reload the data directly
          Promise.all([getDocs(sentQuery), getDocs(receivedQuery)]).then(([sentSnapshot, receivedSnapshot]) => {
            const requests: FriendRequest[] = [];
            
            sentSnapshot.forEach(doc => {
              requests.push({ id: doc.id, ...doc.data() } as FriendRequest);
            });
            
            receivedSnapshot.forEach(doc => {
              const request = { id: doc.id, ...doc.data() } as FriendRequest;
              // Avoid duplicates
              if (!requests.some(r => r.id === request.id)) {
                requests.push(request);
              }
            });
            
            this._friendRequests.next(requests);
            console.log('Friend requests updated, total:', requests.length);
          });
        }
      }, error => {
        console.error('Error in friend requests listener:', error);
      });
    } catch (error) {
      console.error('Failed to set up friend requests listener:', error);
    }
  }

  /**
   * Load all friends for the current user
   */
  private loadFriends(userId: string) {
    console.log('Loading friends for user:', userId);
    const userRef = doc(this.firestore, 'users', userId);
    
    getDoc(userRef).then(docSnap => {
      console.log('User document exists:', docSnap.exists());
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log('User data:', userData);
        const friendIds = userData['friends'] || [];
        console.log('Friend IDs:', friendIds);
        
        if (friendIds.length === 0) {
          this._friends.next([]);
          return;
        }
        
        const friendPromises = friendIds.map((friendId: string) => {
          return getDoc(doc(this.firestore, 'users', friendId))
            .then(snap => {
              if (snap.exists()) {
                return snap.data() as User;
              }
              return null;
            });
        });
        
        Promise.all(friendPromises).then(friends => {
          this._friends.next(friends.filter(Boolean) as User[]);
          console.log('Friends loaded:', friends.length);
        }).catch(error => {
          console.error('Error loading friend data:', error);
        });
      } else {
        console.warn('User document not found in Firestore');
      }
    }).catch(error => {
      console.error('Error loading friends:', error);
    });
  }

  /**
   * Send a friend request to another user
   */
  sendFriendRequest(receiverId: string): Observable<void> {
    console.log('Sending friend request to:', receiverId);
    if (!this.auth.currentUser) {
      console.error('No authenticated user');
      return of(undefined);
    }

    const sender = this.auth.currentUser;
    const requestId = `${sender.uid}_${receiverId}`;
    const requestRef = doc(this.firestore, 'friendRequests', requestId);

    const request: Omit<FriendRequest, 'id'> = {
      senderId: sender.uid,
      senderName: sender.displayName || 'Unknown',
      senderEmail: sender.email || '',
      receiverId,
      status: 'pending',
      createdAt: new Date()
    };

    console.log('Creating friend request document:', request);
    return from(setDoc(requestRef, request)).pipe(
      map(() => {
        console.log('Friend request sent successfully');
        return undefined;
      }),
      catchError(error => {
        console.error('Error sending friend request:', error);
        throw error;
      })
    );
  }

  /**
   * Accept a friend request
   */
  acceptFriendRequest(requestId: string): Observable<void> {
    console.log('Accepting friend request:', requestId);
    const requestRef = doc(this.firestore, 'friendRequests', requestId);
    
    return from(getDoc(requestRef)).pipe(
      switchMap(docSnap => {
        console.log('Friend request document exists:', docSnap.exists());
        if (!docSnap.exists()) {
          console.error('Friend request not found');
          throw new Error('Friend request not found');
        }
        
        const request = docSnap.data() as FriendRequest;
        console.log('Friend request data:', request);
        
        // Update request status
        const updateRequest = updateDoc(requestRef, { status: 'accepted' });
        
        // Add both users to each other's friends list
        const senderRef = doc(this.firestore, 'users', request.senderId);
        const receiverRef = doc(this.firestore, 'users', request.receiverId);
        
        const updateSender = updateDoc(senderRef, {
          friends: arrayUnion(request.receiverId)
        });
        
        const updateReceiver = updateDoc(receiverRef, {
          friends: arrayUnion(request.senderId)
        });
        
        return from(Promise.all([updateRequest, updateSender, updateReceiver])).pipe(
          map(() => {
            console.log('Friend request accepted successfully');
            return void 0;
          }),
          catchError(error => {
            console.error('Error accepting friend request:', error);
            throw error;
          })
        );
      }),
      catchError(error => {
        console.error('Error getting friend request:', error);
        throw error;
      })
    );
  }

  /**
   * Reject a friend request
   */
  rejectFriendRequest(requestId: string): Observable<void> {
    console.log('Rejecting friend request:', requestId);
    const requestRef = doc(this.firestore, 'friendRequests', requestId);
    return from(updateDoc(requestRef, { status: 'rejected' })).pipe(
      map(() => {
        console.log('Friend request rejected successfully');
        return void 0;
      }),
      catchError(error => {
        console.error('Error rejecting friend request:', error);
        throw error;
      })
    );
  }

  /**
   * Remove a friend
   */
  removeFriend(friendId: string): Observable<void> {
    console.log('Removing friend:', friendId);
    if (!this.auth.currentUser) {
      console.error('No authenticated user');
      return of(undefined);
    }
    
    const currentUserId = this.auth.currentUser.uid;
    const userRef = doc(this.firestore, 'users', currentUserId);
    const friendRef = doc(this.firestore, 'users', friendId);
    
    const updateUser = updateDoc(userRef, {
      friends: arrayRemove(friendId)
    });
    
    const updateFriend = updateDoc(friendRef, {
      friends: arrayRemove(currentUserId)
    });
    
    return from(Promise.all([updateUser, updateFriend])).pipe(
      map(() => {
        console.log('Friend removed successfully');
        return void 0;
      }),
      catchError(error => {
        console.error('Error removing friend:', error);
        throw error;
      })
    );
  }

  /**
   * Get pending friend requests for the current user
   */
  getPendingRequests(): Observable<FriendRequest[]> {
    console.log('Getting pending friend requests');
    return this.friendRequests$.pipe(
      map(requests => requests.filter(r => r.status === 'pending' && r.receiverId === this.auth.currentUser?.uid)),
      catchError(error => {
        console.error('Error getting pending friend requests:', error);
        throw error;
      })
    );
  }

  /**
   * Get sent friend requests by the current user
   */
  getSentRequests(): Observable<FriendRequest[]> {
    console.log('Getting sent friend requests');
    return this.friendRequests$.pipe(
      map(requests => requests.filter(r => r.senderId === this.auth.currentUser?.uid)),
      catchError(error => {
        console.error('Error getting sent friend requests:', error);
        throw error;
      })
    );
  }
}
