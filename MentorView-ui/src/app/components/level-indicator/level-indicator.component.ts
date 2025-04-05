import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { XpService } from '../../services/xp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-indicator.component.html',
  styleUrls: ['./level-indicator.component.css']
})
export class LevelIndicatorComponent implements OnInit, OnDestroy {
  level: number = 0;
  totalXP: number = 0;
  currentLevelXP: number = 0;
  xpForNextLevel: number = 100;
  progressPercentage: number = 0;
  isLevelingUp: boolean = false;
  private subscriptions: Subscription[] = [];
  private prevLevel: number = 0;

  constructor(private xpService: XpService) { }

  ngOnInit(): void {
    // Subscribe to level changes
    this.subscriptions.push(
      this.xpService.userLevel$.subscribe(level => {
        // Check if leveling up
        if (this.prevLevel > 0 && level > this.prevLevel) {
          this.triggerLevelUpAnimation();
        }
        this.prevLevel = level;
        this.level = level;
        
        // Recalculate XP progress when level changes
        this.calculateLevelProgress();
      })
    );

    // Subscribe to XP changes
    this.subscriptions.push(
      this.xpService.userXP$.subscribe(totalXP => {
        this.totalXP = totalXP;
        // Calculate XP within the current level
        this.calculateLevelProgress();
      })
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Calculate the XP progress within the current level
   */
  private calculateLevelProgress(): void {
    // Get XP required for next level
    this.xpForNextLevel = this.xpService.getXpForNextLevel(this.level);
    
    // Calculate XP within the current level
    if (this.level === 0) {
      // For level 0, simply show total XP
      this.currentLevelXP = this.totalXP;
    } else {
      // For higher levels, show XP since reaching the current level
      const xpRequiredForCurrentLevel = this.xpService.getXpRequiredForLevel(this.level);
      this.currentLevelXP = this.totalXP - xpRequiredForCurrentLevel;
    }
    
    // Calculate progress percentage based on current level XP
    this.progressPercentage = (this.currentLevelXP / this.xpForNextLevel) * 100;
  }

  private triggerLevelUpAnimation(): void {
    this.isLevelingUp = true;
    setTimeout(() => {
      this.isLevelingUp = false;
    }, 1000);
  }
}
