import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';

export interface SpeakingPaceData {
  averageWpm: number;
  totalWords: number;
  totalDurationSeconds: number;
  paceStatus: 'Too Slow' | 'Optimal' | 'Too Fast';
  lastUpdated: string;
}

export interface UserPaceHistory {
  date: string;
  interviewId: string; // Reference to the specific interview
  wpm: number;
  totalWords: number;
  durationSeconds: number;
  paceStatus: 'Too Slow' | 'Optimal' | 'Too Fast';
}

// Standard speaking rate values for reference (used for categorization)
export const MIN_OPTIMAL_WPM = 120;
export const MAX_OPTIMAL_WPM = 160;

@Injectable({
  providedIn: 'root'
})
export class SpeakingPaceService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private currentUserId: string | null = null;

  constructor() {
    // Track the current user ID
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUserId = user ? user.uid : null;
      console.log('SpeakingPaceService: User ID updated:', this.currentUserId);
    });
    
    // Also get the current user ID immediately if already logged in
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      this.currentUserId = currentUser.uid;
      console.log('SpeakingPaceService: Initial user ID set:', this.currentUserId);
    }
  }

  /**
   * Saves speaking pace data for the current user
   * @param wpm Words per minute rate
   * @param totalWords Total number of words in the transcript
   * @param durationSeconds Duration of the speaking in seconds
   * @param interviewId ID of the interview this data is associated with
   * @returns Observable that completes when the data is saved
   */
  saveSpeakingPaceData(
    wpm: number,
    totalWords: number,
    durationSeconds: number,
    interviewId: string
  ): Observable<void> {
    if (!this.currentUserId) {
      console.error('Cannot save speaking pace data - user not logged in');
      return of();
    }

    // Determine pace status based on WPM thresholds
    let paceStatus: 'Too Slow' | 'Optimal' | 'Too Fast';
    if (wpm < MIN_OPTIMAL_WPM) {
      paceStatus = 'Too Slow';
    } else if (wpm > MAX_OPTIMAL_WPM) {
      paceStatus = 'Too Fast';
    } else {
      paceStatus = 'Optimal';
    }
    
    const userData: SpeakingPaceData = {
      averageWpm: wpm,
      totalWords,
      totalDurationSeconds: durationSeconds,
      paceStatus,
      lastUpdated: new Date().toISOString()
    };

    // Record in user's history as well
    const historyEntry: UserPaceHistory = {
      date: new Date().toISOString(),
      interviewId,
      wpm,
      totalWords,
      durationSeconds,
      paceStatus
    };

    // Create/update the user's speaking pace document
    const userPaceRef = doc(this.firestore, 'userSpeakingPace', this.currentUserId);
    
    return from(
      getDoc(userPaceRef).then(docSnap => {
        if (docSnap.exists()) {
          // Update existing document
          return updateDoc(userPaceRef, {
            current: userData,
            history: arrayUnion(historyEntry)
          });
        } else {
          // Create new document
          return setDoc(userPaceRef, {
            userId: this.currentUserId,
            current: userData,
            history: [historyEntry]
          });
        }
      })
    );
  }

  /**
   * Gets the current speaking pace data for the user
   * @returns Observable with the speaking pace data
   */
  getCurrentSpeakingPaceData(): Observable<SpeakingPaceData | null> {
    if (!this.currentUserId) {
      console.error('Cannot get speaking pace data - user not logged in');
      
      // Try to get current user once more before giving up
      const currentUser = this.firebaseAuth.currentUser;
      if (currentUser) {
        this.currentUserId = currentUser.uid;
        console.log('SpeakingPaceService: Recovered user ID:', this.currentUserId);
      } else {
        return of(null);
      }
    }

    const userPaceRef = doc(this.firestore, 'userSpeakingPace', this.currentUserId);
    console.log('SpeakingPaceService: Fetching data for user:', this.currentUserId);
    
    return from(
      getDoc(userPaceRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data()['current']) {
          console.log('SpeakingPaceService: Found current data for user');
          return docSnap.data()['current'] as SpeakingPaceData;
        }
        console.log('SpeakingPaceService: No current data found for user');
        return null;
      })
    );
  }

  /**
   * Gets the speaking pace history for the user
   * @returns Observable with the speaking pace history
   */
  getSpeakingPaceHistory(): Observable<UserPaceHistory[]> {
    if (!this.currentUserId) {
      console.error('Cannot get speaking pace history - user not logged in');
      
      // Try to get current user once more before giving up
      const currentUser = this.firebaseAuth.currentUser;
      if (currentUser) {
        this.currentUserId = currentUser.uid;
        console.log('SpeakingPaceService: Recovered user ID for history:', this.currentUserId);
      } else {
        return of([]);
      }
    }

    const userPaceRef = doc(this.firestore, 'userSpeakingPace', this.currentUserId);
    console.log('SpeakingPaceService: Fetching history for user:', this.currentUserId);
    
    return from(
      getDoc(userPaceRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data()['history']) {
          const history = docSnap.data()['history'] as UserPaceHistory[];
          console.log(`SpeakingPaceService: Found ${history.length} history entries for user`);
          return history;
        }
        console.log('SpeakingPaceService: No history found for user');
        return [];
      })
    );
  }

  /**
   * Get the status label for a given WPM
   * @param wpm Words per minute
   * @returns Status label ('Too Slow', 'Optimal', or 'Too Fast')
   */
  getStatusForWpm(wpm: number): 'Too Slow' | 'Optimal' | 'Too Fast' {
    if (wpm < MIN_OPTIMAL_WPM) {
      return 'Too Slow';
    } else if (wpm > MAX_OPTIMAL_WPM) {
      return 'Too Fast';
    } else {
      return 'Optimal';
    }
  }
}
