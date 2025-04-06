import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';

export interface FillerWordData {
  wordCounts: { [key: string]: number };
  totalFillerWords: number;
  totalWords: number;
  percentage: number;
  lastUpdated: string;
}

export interface UserFillerWordHistory {
  date: string;
  percentage: number;
  totalFillerWords: number;
  totalWords: number;
  wordCounts: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class FillerWordsService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private currentUserId: string | null = null;

  constructor() {
    // Track the current user ID
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUserId = user ? user.uid : null;
    });
  }

  /**
   * Saves filler word data for the current user
   * @param fillerWordCounts Object containing filler word counts
   * @param totalFillerWords Total number of filler words used
   * @param totalWords Total number of words in the transcript
   * @returns Observable that completes when the data is saved
   */
  saveFillerWordData(
    fillerWordCounts: { [key: string]: number },
    totalFillerWords: number,
    totalWords: number
  ): Observable<void> {
    if (!this.currentUserId) {
      console.error('Cannot save filler word data - user not logged in');
      return of();
    }

    const percentage = totalWords > 0 ? (totalFillerWords / totalWords) * 100 : 0;
    const formattedPercentage = parseFloat(percentage.toFixed(2));
    
    const userData: FillerWordData = {
      wordCounts: { ...fillerWordCounts },
      totalFillerWords,
      totalWords,
      percentage: formattedPercentage,
      lastUpdated: new Date().toISOString()
    };

    // Record in user's history as well
    const historyEntry: UserFillerWordHistory = {
      date: new Date().toISOString(),
      percentage: formattedPercentage,
      totalFillerWords,
      totalWords,
      wordCounts: { ...fillerWordCounts }
    };

    // Create/update the user's filler word document
    const userFillerWordsRef = doc(this.firestore, 'userFillerWords', this.currentUserId);
    
    return from(
      getDoc(userFillerWordsRef).then(docSnap => {
        if (docSnap.exists()) {
          // Update existing document
          return updateDoc(userFillerWordsRef, {
            current: userData,
            history: arrayUnion(historyEntry)
          });
        } else {
          // Create new document
          return setDoc(userFillerWordsRef, {
            userId: this.currentUserId,
            current: userData,
            history: [historyEntry]
          });
        }
      })
    );
  }

  /**
   * Gets the current filler word data for the user
   * @returns Observable with the filler word data
   */
  getCurrentFillerWordData(): Observable<FillerWordData | null> {
    if (!this.currentUserId) {
      console.error('Cannot get filler word data - user not logged in');
      return of(null);
    }

    const userFillerWordsRef = doc(this.firestore, 'userFillerWords', this.currentUserId);
    
    return from(
      getDoc(userFillerWordsRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data()['current']) {
          return docSnap.data()['current'] as FillerWordData;
        }
        return null;
      })
    );
  }

  /**
   * Gets the filler word history for the user
   * @returns Observable with the filler word history
   */
  getFillerWordHistory(): Observable<UserFillerWordHistory[]> {
    if (!this.currentUserId) {
      console.error('Cannot get filler word history - user not logged in');
      return of([]);
    }

    const userFillerWordsRef = doc(this.firestore, 'userFillerWords', this.currentUserId);
    
    return from(
      getDoc(userFillerWordsRef).then(docSnap => {
        if (docSnap.exists() && docSnap.data()['history']) {
          return docSnap.data()['history'] as UserFillerWordHistory[];
        }
        return [];
      })
    );
  }
}
