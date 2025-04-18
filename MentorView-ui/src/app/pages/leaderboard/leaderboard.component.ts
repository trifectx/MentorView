import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, query, orderBy, limit, getDocs, where, DocumentData, doc, getDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { NavbarComponent } from '../../components/navbar/navbar.component';

interface LeaderboardUser {
  uid: string;
  displayName: string;
  photoURL: string;
  totalXP: number;
  level: number;
  rank: number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent]
})
export class LeaderboardComponent implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  
  globalLeaderboardUsers: LeaderboardUser[] = [];
  friendsLeaderboardUsers: LeaderboardUser[] = [];
  loading = true;
  error = false;
  activeTab: 'global' | 'local' = 'global';
  currentUserId: string | null = null;
  currentUserRank: number | null = null;
  currentUserXP: number = 0;
  currentUserLevel: number = 0;
  
  ngOnInit(): void {
    // Get current user ID
    this.auth.onAuthStateChanged(user => {
      this.currentUserId = user ? user.uid : null;
      this.loadLeaderboard();
    });
  }
  
  setActiveTab(tab: 'global' | 'local'): void {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      console.log('Switching to tab:', tab);
      // No need to reload data each time we switch tabs
    }
  }
  
  async loadLeaderboard(): Promise<void> {
    this.loading = true;
    this.error = false;
    
    try {
      console.log('Loading leaderboard data...');
      
      // Load current user stats regardless of tab
      await this.loadCurrentUserStats();
      
      // Load both leaderboards at once
      await Promise.all([
        this.loadGlobalLeaderboard(),
        this.loadLocalLeaderboard()
      ]);
      
      this.loading = false;
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      this.error = true;
      this.loading = false;
    }
  }

  async loadCurrentUserStats(): Promise<void> {
    if (!this.currentUserId) return;

    try {
      // Get current user's XP data
      const userXpDocRef = doc(this.firestore, 'userXP', this.currentUserId);
      const userXpDoc = await getDoc(userXpDocRef);
      
      if (userXpDoc.exists()) {
        const userData = userXpDoc.data();
        this.currentUserXP = userData['totalXP'] || 0;
        this.currentUserLevel = this.calculateLevel(this.currentUserXP);
        
        // Find user rank in global leaderboard
        const usersWithMoreXP = await getDocs(
          query(
            collection(this.firestore, 'userXP'),
            where('totalXP', '>', this.currentUserXP),
            orderBy('totalXP', 'desc')
          )
        );
        
        // Rank is the number of users with more XP + 1
        this.currentUserRank = usersWithMoreXP.docs.length + 1;
      } else {
        this.currentUserXP = 0;
        this.currentUserLevel = 0;
        this.currentUserRank = null;
      }
    } catch (error) {
      console.error('Error loading current user stats:', error);
      // Don't set error state, we'll just show default values
    }
  }
  
  async loadGlobalLeaderboard(): Promise<void> {
    console.log('Loading global leaderboard');
    const usersRef = collection(this.firestore, 'userXP');
    const q = query(usersRef, orderBy('totalXP', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    
    // Clear global leaderboard first
    this.globalLeaderboardUsers = [];
    await this.processLeaderboardData(querySnapshot.docs, 'global');
    console.log('Global leaderboard loaded with', this.globalLeaderboardUsers.length, 'entries');
  }
  
  async loadLocalLeaderboard(): Promise<void> {
    if (!this.currentUserId) {
      console.log('No current user ID, cannot load friends leaderboard');
      this.friendsLeaderboardUsers = [];
      return;
    }
    
    try {
      console.log('Loading friends leaderboard for user:', this.currentUserId);
      
      // Reset the friends leaderboard array
      this.friendsLeaderboardUsers = [];
      
      // Get the current user document to access their friends list
      const userDocRef = doc(this.firestore, 'users', this.currentUserId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        console.log('User document not found');
        this.friendsLeaderboardUsers = [];
        return;
      }
      
      // Get the friends array directly from the user document
      const userData = userSnapshot.data();
      const friendsArray = userData['friends'] || [];
      
      // Prepare to store all friend IDs
      const friendIds: string[] = [];
      
      // Extract friend IDs from the friends array
      console.log('Friends array from user document:', friendsArray);
      
      // Based on the screenshot, the friends array contains objects with numeric keys
      // and string values representing the friend IDs
      if (typeof friendsArray === 'object' && friendsArray !== null) {
        // Handle the case where friends is an object with numeric keys (as shown in screenshot)
        Object.keys(friendsArray).forEach(key => {
          const friendId = friendsArray[key];
          if (typeof friendId === 'string' && !friendIds.includes(friendId)) {
            console.log(`Adding friend ID from key ${key}:`, friendId);
            friendIds.push(friendId);
          }
        });
      } else if (Array.isArray(friendsArray)) {
        // Fallback: If friends is a regular array
        friendsArray.forEach(friend => {
          if (typeof friend === 'string') {
            friendIds.push(friend);
          } else if (typeof friend === 'object' && friend !== null) {
            // If friends is an array of objects with IDs
            const friendId = friend.id || friend.uid;
            if (friendId) {
              friendIds.push(friendId);
            }
          }
        });
      }
      
      // Always include current user in the friends leaderboard
      if (this.currentUserId && !friendIds.includes(this.currentUserId)) {
        friendIds.push(this.currentUserId);
      }
      
      console.log(`Found ${friendIds.length} friends for leaderboard:`, friendIds);
      
      if (friendIds.length === 0) {
        console.log('No friends found for leaderboard');
        this.friendsLeaderboardUsers = [];
        return;
      }
      
      // Get XP data for all friends
      const userXpData: DocumentData[] = [];
      
      // Fetch user data for each friend ID
      for (const friendId of friendIds) {
        try {
          // First try to get the user's profile from users collection
          const userDocRef = doc(this.firestore, 'users', friendId);
          const userSnapshot = await getDoc(userDocRef);
          
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            console.log(`Found user data for ${friendId}:`, userData);
            
            // Check if the user has XP data directly in their user document
            if (userData.hasOwnProperty('totalXP')) {
              userXpData.push({
                id: friendId,
                data: () => ({ 
                  uid: friendId, 
                  totalXP: userData['totalXP'] || 0,
                  displayName: userData['displayName'] || ''
                })
              } as any);
              continue; // Skip to next friend if we found XP data
            }
          }
          
          // If no direct XP data in user document, try the userXP collection
          const xpDocRef = doc(this.firestore, 'userXP', friendId);
          const xpSnapshot = await getDoc(xpDocRef);
          
          if (xpSnapshot.exists()) {
            const xpData = xpSnapshot.data();
            userXpData.push({
              id: friendId,
              data: () => ({ ...xpData, uid: friendId })
            } as any);
            continue;
          }
          
          // Last attempt: try userXP collection with uid field
          const userXpRef = collection(this.firestore, 'userXP');
          const uidQuery = query(userXpRef, where('uid', '==', friendId));
          const uidSnapshot = await getDocs(uidQuery);
          
          if (!uidSnapshot.empty) {
            userXpData.push(...uidSnapshot.docs);
            continue;
          }
          
          // If we still don't have data, create a placeholder with 0 XP
          // but only if we have user profile data
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            userXpData.push({
              id: friendId,
              data: () => ({ 
                uid: friendId, 
                totalXP: 0,
                displayName: userData['displayName'] || ''
              })
            } as any);
          }
        } catch (error) {
          console.error(`Error fetching data for friend ${friendId}:`, error);
        }
      }
      
      console.log(`Found ${userXpData.length} XP records for friends`);
      
      // Sort by XP descending
      userXpData.sort((a, b) => {
        const aXP = a['data']()['totalXP'] || 0;
        const bXP = b['data']()['totalXP'] || 0;
        return bXP - aXP;
      });
      
      await this.processLeaderboardData(userXpData, 'friends');
    } catch (error) {
      console.error('Error fetching friends data:', error);
      this.error = true;
      this.friendsLeaderboardUsers = [];
    }
  }
  
  async processLeaderboardData(docs: DocumentData[], type: 'global' | 'friends'): Promise<void> {
      console.log(`Processing ${type} leaderboard data for`, docs.length, 'documents');
      
      // Select the right array based on the type
      const targetArray = type === 'global' ? this.globalLeaderboardUsers : this.friendsLeaderboardUsers;
      
      // Process each user document
      let rank = 1;
      for (const docData of docs) {
        try {
          // Get document data safely
          const userData = docData['data'] ? docData['data']() : {};
          const userId = docData['id'] || userData['uid'];
          
          if (!userId) {
            console.error('No user ID found in document:', docData);
            continue; // Skip this document
          }
          
          console.log('Processing leaderboard user:', userId);
          
          // Calculate the level based on XP
          const totalXP = userData.totalXP || userData['totalXP'] || 0;
          const level = this.calculateLevel(totalXP);
          
          // Get user profile data
          let displayName = '';
          let photoURL = 'assets/images/default-avatar.png';
          
          try {
            // Get user profile from the users collection
            const userDocRef = doc(this.firestore, 'users', userId);
            const userSnapshot = await getDoc(userDocRef);
            
            if (userSnapshot.exists()) {
              const profileData = userSnapshot.data();
              displayName = profileData['displayName'] || '';
              
              // If no display name but has email, use email username
              if (!displayName && profileData['email']) {
                displayName = profileData['email'].split('@')[0];
              }
              
              if (profileData['photoURL']) {
                photoURL = profileData['photoURL'];
              }
            }
            
            // If still no display name, check userProfiles collection
            if (!displayName) {
              const profileDocRef = doc(this.firestore, 'userProfiles', userId);
              const profileSnapshot = await getDoc(profileDocRef);
              
              if (profileSnapshot.exists()) {
                const profileData = profileSnapshot.data();
                displayName = profileData['displayName'] || '';
                
                if (profileData['photoURL']) {
                  photoURL = profileData['photoURL'];
                }
              }
            }
            
            // Last resort: create a user name from the ID
            if (!displayName) {
              displayName = 'User_' + userId.substring(0, 6);
            }
          } catch (profileError) {
            console.error('Error fetching profile for user', userId, profileError);
            displayName = 'User_' + userId.substring(0, 6);
          }
          
          // Add user to the appropriate leaderboard
          targetArray.push({
            uid: userId,
            displayName,
            photoURL,
            totalXP,
            level,
            rank: rank++
          });
        } catch (docError) {
          console.error('Error processing leaderboard document:', docError);
          continue; // Skip this document
        }
      }
      
      console.log(`Finished processing ${type} leaderboard, entries:`, targetArray.length);
  }
  
  // Calculate level using the same logic as in XpService
  private calculateLevel(totalXP: number): number {
    const BASE_XP_REQUIREMENT = 100;
    const LEVEL_XP_INCREMENT = 50;
    
    if (totalXP < BASE_XP_REQUIREMENT) {
      return 0; // Level 0 until reaching 100 XP
    }
    
    let level = 1;
    let xpThreshold = BASE_XP_REQUIREMENT;
    let currentLevelRequirement = LEVEL_XP_INCREMENT;
    
    while (totalXP >= xpThreshold + currentLevelRequirement) {
      level++;
      xpThreshold += currentLevelRequirement;
      currentLevelRequirement += LEVEL_XP_INCREMENT;
    }
    
    return level;
  }
}
