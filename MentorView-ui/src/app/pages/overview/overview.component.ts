import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class OverviewComponent implements OnInit {
  // Mock performance data - in a real app, this would come from a service
  performanceData = {
    strengths: ['Clear communication', 'Good pacing', 'Structured answers'],
    weaknesses: ['Occasional filler words', 'Limited eye contact', 'Can improve technical depth'],
    averageWpm: 145,
    speakingPaceStatus: 'Optimal',  // 'Too Fast', 'Too Slow', or 'Optimal'
    averageScore: 8.2,  // Out of 10
    recentInterviews: [
      { date: '2025-03-10', topic: 'System Design', score: 8.5, wpm: 150 },
      { date: '2025-03-05', topic: 'Algorithms', score: 7.8, wpm: 148 },
      { date: '2025-02-25', topic: 'Behavioral', score: 8.4, wpm: 140 }
    ]
  };

  // Charts data
  progressChartData = {
    scores: [7.2, 7.5, 7.9, 8.1, 8.2],
    wpm: [130, 135, 138, 142, 145]
  };
  
  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch the user's performance data here
  }

  getPaceClass(): string {
    if (this.performanceData.speakingPaceStatus === 'Optimal') {
      return 'optimal';
    } else if (this.performanceData.speakingPaceStatus === 'Too Fast') {
      return 'too-fast';
    } else {
      return 'too-slow';
    }
  }

  getScoreClass(): string {
    const score = this.performanceData.averageScore;
    if (score >= 8) {
      return 'good';
    } else if (score >= 6) {
      return 'average';
    } else {
      return 'needs-improvement';
    }
  }
}
