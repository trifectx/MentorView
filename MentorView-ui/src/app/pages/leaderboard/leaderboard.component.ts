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
  
  leaderboardUsers: LeaderboardUser[] = [];
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
      this.loadLeaderboard();
    }
  }
  
  async loadLeaderboard(): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      
      // Load current user stats regardless of tab
      await this.loadCurrentUserStats();
      
      if (this.activeTab === 'global') {
        await this.loadGlobalLeaderboard();
      } else {
        await this.loadLocalLeaderboard();
      }
      
      this.loading = false;
    } catch (error) {
      console.error(`Error loading ${this.activeTab} leaderboard:`, error);
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
    // Query the top 50 users by XP
    const usersRef = collection(this.firestore, 'userXP');
    const q = query(usersRef, orderBy('totalXP', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    
    await this.processLeaderboardData(querySnapshot.docs);
  }
  
  async loadLocalLeaderboard(): Promise<void> {
    if (!this.currentUserId) {
      this.leaderboardUsers = [];
      return;
    }
    
    // First get the user's friends list
    try {
      const friendsRef = collection(this.firestore, 'friendships');
      const friendsQuery = query(friendsRef, 
        where('userId', '==', this.currentUserId), 
        where('status', '==', 'accepted')
      );
      const friendsSnapshot = await getDocs(friendsQuery);
      
      // Extract friend IDs
      const friendIds = friendsSnapshot.docs.map(doc => doc.data()['friendId']);
      
      // Include current user in local leaderboard
      if (this.currentUserId) {
        friendIds.push(this.currentUserId);
      }
      
      if (friendIds.length === 0) {
        this.leaderboardUsers = [];
        return;
      }
      
      // Get XP data for friends
      const userXpData: DocumentData[] = [];
      
      // Due to Firestore limitations, we might need to do multiple queries if there are many friends
      const batchSize = 10; // Firestore 'in' operator allows up to 10 values
      for (let i = 0; i < friendIds.length; i += batchSize) {
        const batch = friendIds.slice(i, i + batchSize);
        const usersRef = collection(this.firestore, 'userXP');
        const q = query(usersRef, where('uid', 'in', batch), orderBy('totalXP', 'desc'));
        const batchSnapshot = await getDocs(q);
        userXpData.push(...batchSnapshot.docs);
      }
      
      // Sort by XP descending
      userXpData.sort((a, b) => (b['data']()['totalXP'] || 0) - (a['data']()['totalXP'] || 0));
      
      await this.processLeaderboardData(userXpData);
    } catch (error) {
      console.error('Error fetching friends data:', error);
      throw error;
    }
  }
  
  async processLeaderboardData(docs: DocumentData[]): Promise<void> {
      
      // Reset leaderboard array
      this.leaderboardUsers = [];
      
      // Process each user document
      let rank = 1;
      for (const docData of docs) {
        const userData = docData['data']();
        
        // Calculate the level based on XP
        const level = this.calculateLevel(userData['totalXP'] || 0);
        
        // Get user profile data
        let displayName = '';
        let photoURL = 'assets/images/default-avatar.png';
        
        try {
          // Get the user ID from the document
          const userId = docData['id'] || userData['uid'];
          
          if (userId) {
            // Get user profile from the users collection
            const userDocRef = doc(this.firestore, 'users', userId);
            const userSnapshot = await getDoc(userDocRef);
            
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              displayName = userData['displayName'] || '';
              
              // If no display name but has email, use email username
              if (!displayName && userData['email']) {
                displayName = userData['email'].split('@')[0];
              }
              
              if (userData['photoURL']) {
                photoURL = userData['photoURL'];
              }
            }
            
            // If no name found in users collection, try userProfiles
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
            
            // Last resort: use a shortened version of the user ID
            if (!displayName) {
              displayName = 'User_' + userId.substring(0, 6);
            }
          }
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Use a generic name if all else fails
          displayName = 'MentorView User';
        }
        
        // Add user to leaderboard
        this.leaderboardUsers.push({
          uid: typeof docData['id'] === 'string' ? docData['id'] : docData['id'].toString(),
          displayName,
          photoURL,
          totalXP: userData['totalXP'] || 0,
          level,
          rank: rank++
        });
      }
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
