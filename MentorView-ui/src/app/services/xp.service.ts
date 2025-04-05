import { Injectable, inject } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserXP {
  uid: string;
  totalXP: number;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class XpService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private currentUser: User | null = null;
  
  // XP and level data
  private _userXP = new BehaviorSubject<number>(0);
  private _userLevel = new BehaviorSubject<number>(0);
  private _levelProgress = new BehaviorSubject<number>(0);

  // Public observables for components to subscribe to
  public userXP$ = this._userXP.asObservable();
  public userLevel$ = this._userLevel.asObservable();
  public levelProgress$ = this._levelProgress.asObservable();
  
  // Base XP required for level 1
  private readonly BASE_XP_REQUIREMENT = 100;
  // Additional XP required per level
  private readonly LEVEL_XP_INCREMENT = 50;

  constructor() {
    // Watch for auth state changes
    onAuthStateChanged(this.firebaseAuth, (user) => {
      this.currentUser = user;
      if (user) {
        // Load user XP when authenticated
        this.loadUserXP(user.uid);
      } else {
        // Reset XP when logged out
        this.resetXP();
      }
    });
  }

  /**
   * Load a user's XP from Firestore
   */
  private async loadUserXP(uid: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'userXP', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data() as UserXP;
        this._userXP.next(userData.totalXP);
        this.calculateLevelAndProgress(userData.totalXP);
      } else {
        // Create a new XP record if it doesn't exist
        await this.initializeUserXP(uid);
      }
    } catch (error) {
      console.error('Error loading user XP:', error);
    }
  }

  /**
   * Initialize a new user's XP record
   */
  private async initializeUserXP(uid: string): Promise<void> {
    try {
      const userXP: UserXP = {
        uid,
        totalXP: 0,
        lastUpdated: new Date()
      };
      
      await setDoc(doc(this.firestore, 'userXP', uid), userXP);
      this._userXP.next(0);
      this.calculateLevelAndProgress(0);
    } catch (error) {
      console.error('Error initializing user XP:', error);
    }
  }

  /**
   * Calculate the user's level based on total XP
   * Level 1: 0-100 XP
   * Level 2: 101-250 XP (requires 150 XP more)
   * Level 3: 251-450 XP (requires 200 XP more)
   * Level 4: 451-700 XP (requires 250 XP more)
   * And so on, with each level requiring 50 XP more than the previous level
   * 
   * @param totalXP The user's total XP
   * @returns The calculated level
   */
  private calculateLevel(totalXP: number): number {
    if (totalXP < this.BASE_XP_REQUIREMENT) {
      return 0; // Level 0 until reaching 100 XP
    }
    
    let level = 1;
    let xpThreshold = this.BASE_XP_REQUIREMENT;
    let currentLevelRequirement = this.LEVEL_XP_INCREMENT;
    
    while (totalXP >= xpThreshold + currentLevelRequirement) {
      level++;
      xpThreshold += currentLevelRequirement;
      currentLevelRequirement += this.LEVEL_XP_INCREMENT;
    }
    
    return level;
  }

  /**
   * Calculate progress percentage towards the next level
   * 
   * @param totalXP The user's total XP
   * @returns A number between 0 and 1 representing the progress towards the next level
   */
  private calculateLevelProgress(totalXP: number): number {
    const level = this.calculateLevel(totalXP);
    
    if (level === 0) {
      // For level 0, progress is simply percentage of the base XP requirement
      return totalXP / this.BASE_XP_REQUIREMENT;
    }
    
    // Calculate the XP threshold for the current level
    let xpThreshold = this.BASE_XP_REQUIREMENT;
    let currentRequirement = this.LEVEL_XP_INCREMENT;
    
    for (let i = 1; i < level; i++) {
      xpThreshold += currentRequirement;
      currentRequirement += this.LEVEL_XP_INCREMENT;
    }
    
    // XP needed for next level
    const xpForNextLevel = currentRequirement;
    
    // Calculate how much XP the user has earned towards the next level
    const xpIntoCurrentLevel = totalXP - xpThreshold;
    
    // Calculate progress as a percentage
    return xpIntoCurrentLevel / xpForNextLevel;
  }

  /**
   * Calculate user level and progress based on total XP
   */
  private calculateLevelAndProgress(totalXP: number): void {
    const level = this.calculateLevel(totalXP);
    const progress = this.calculateLevelProgress(totalXP);
    
    this._userLevel.next(level);
    this._levelProgress.next(Math.min(progress * 100, 100));
  }

  /**
   * Reset XP values (used when logging out)
   */
  private resetXP(): void {
    this._userXP.next(0);
    this._userLevel.next(0);
    this._levelProgress.next(0);
  }

  /**
   * Get current user level
   */
  public getUserLevel(): number {
    return this._userLevel.value;
  }

  /**
   * Get current level progress
   */
  public getLevelProgress(): number {
    return this._levelProgress.value;
  }

  /**
   * Get total XP
   */
  public getTotalXP(): number {
    return this._userXP.value;
  }

  /**
   * Award XP to the current user based on interview rating and difficulty
   * 
   * @param rating The interview rating (1-10), can include decimals
   * @param difficultyModifier The difficulty modifier (typically 0.5-2.0)
   * @returns Promise resolving to the new total XP
   */
  public async awardInterviewXP(rating: number, difficultyModifier: number): Promise<number> {
    try {
      if (!this.currentUser || !this.currentUser.uid) {
        console.error('Cannot award XP: No authenticated user');
        return 0;
      }

      // Calculate XP to award (using precise decimal rating)
      const xpToAward = Math.round(rating * 10 * difficultyModifier);
      
      const docRef = doc(this.firestore, 'userXP', this.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const currentXP = userData['totalXP'] || 0;
        const newTotalXP = currentXP + xpToAward;
        
        // Update the document with new XP
        await updateDoc(docRef, {
          totalXP: newTotalXP,
          lastUpdated: new Date()
        });
        
        // Update the BehaviorSubject with new values
        this._userXP.next(newTotalXP);
        this.calculateLevelAndProgress(newTotalXP);
        
        return newTotalXP;
      } else {
        // First time earning XP, create document
        await setDoc(docRef, {
          totalXP: xpToAward,
          uid: this.currentUser.uid,
          createdAt: new Date(),
          lastUpdated: new Date()
        });
        
        // Update the BehaviorSubject with new values
        this._userXP.next(xpToAward);
        this.calculateLevelAndProgress(xpToAward);
        
        return xpToAward;
      }
    } catch (error) {
      console.error('Error awarding XP:', error);
      return 0;
    }
  }

  /**
   * Calculate difficulty modifier based on the interview type and question complexity
   * 
   * @param questionText The interview question text
   * @param interviewStyle The style of interview
   * @returns A difficulty modifier (0.8 - 2.0)
   */
  public calculateDifficultyModifier(questionText: string, interviewStyle: string): number {
    // Base modifier by interview style
    let styleModifier = 1.0;
    switch (interviewStyle.toLowerCase()) {
      case 'technical':
        styleModifier = 1.5;
        break;
      case 'behavioral':
        styleModifier = 1.0;
        break;
      case 'assessment':
        styleModifier = 1.8;
        break;
      case 'case':
        styleModifier = 1.6;
        break;
      default:
        styleModifier = 1.0;
    }
    
    // Analyze question complexity based on length and complexity indicators
    const questionLength = questionText.length;
    const complexityKeywords = [
      'challenge', 'difficult', 'complex', 'analyze', 'design', 'implement',
      'architecture', 'optimize', 'scale', 'trade-off', 'algorithm', 'system',
      'performance', 'leadership', 'conflict', 'failure', 'mistake'
    ];
    
    // Count complexity indicators in question
    const keywordCount = complexityKeywords.reduce((count, keyword) => {
      return count + (questionText.toLowerCase().split(keyword.toLowerCase()).length - 1);
    }, 0);
    
    // Question complexity modifier (0.8 - 1.5)
    let questionModifier = 0.8;
    if (questionLength > 500 || keywordCount > 5) {
      questionModifier = 1.5;
    } else if (questionLength > 300 || keywordCount > 3) {
      questionModifier = 1.3;
    } else if (questionLength > 200 || keywordCount > 1) {
      questionModifier = 1.1;
    } else if (questionLength > 100) {
      questionModifier = 0.9;
    }
    
    // Final modifier is a combination of style and question complexity
    return Math.min(styleModifier * questionModifier, 2.0);
  }

  /**
   * Get the XP required to reach a specific level
   * 
   * @param targetLevel The level to calculate XP for
   * @returns The total XP required to reach that level
   */
  public getXpRequiredForLevel(targetLevel: number): number {
    if (targetLevel <= 0) {
      return 0;
    }
    
    if (targetLevel === 1) {
      return this.BASE_XP_REQUIREMENT;
    }
    
    let totalXpRequired = this.BASE_XP_REQUIREMENT;
    let currentLevelRequirement = this.LEVEL_XP_INCREMENT;
    
    for (let i = 1; i < targetLevel; i++) {
      totalXpRequired += currentLevelRequirement;
      currentLevelRequirement += this.LEVEL_XP_INCREMENT;
    }
    
    return totalXpRequired;
  }

  /**
   * Get the XP required to reach the next level from the current level
   * 
   * @param currentLevel The current level
   * @returns The XP required to level up
   */
  public getXpForNextLevel(currentLevel: number): number {
    // Base case: level 0 to 1 needs BASE_XP_REQUIREMENT
    if (currentLevel === 0) {
      return this.BASE_XP_REQUIREMENT;
    }
    
    // For level 1, need 150 XP to reach level 2
    // For level 2, need 200 XP to reach level 3
    // For level 3, need 250 XP to reach level 4
    return this.LEVEL_XP_INCREMENT + (currentLevel * this.LEVEL_XP_INCREMENT);
  }
}
