import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, SavedInterview } from '../../services/api.service';

interface InterviewStats {
  totalInterviews: number;
  averageScore: number;
  topScore: number;
  recentInterviews: SavedInterview[];
  scoreByCategory: { [key: string]: number };
  interviewDates: string[];
  interviewScores: number[];
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class OverviewComponent implements OnInit {
  // Performance data structure
  performanceData = {
    strengths: ['Clear communication', 'Good pacing', 'Structured answers'],
    weaknesses: ['Occasional filler words', 'Limited eye contact', 'Can improve technical depth'],
    averageWpm: 0,
    speakingPaceStatus: 'Optimal',  // 'Too Fast', 'Too Slow', or 'Optimal'
    averageScore: 0,  // Out of 10
    recentInterviews: [] // Will be populated from actual data
  };

  // Charts data
  progressChartData = {
    scores: [],
    wpm: []
  };
  
  // Interview tracking data
  interviewStats: InterviewStats = {
    totalInterviews: 0,
    averageScore: 0,
    topScore: 0,
    recentInterviews: [],
    scoreByCategory: {},
    interviewDates: [],
    interviewScores: []
  };
  
  loading = false;
  error = '';
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch the saved interviews data
    this.loadInterviewData();
  }
  
  loadInterviewData(): void {
    this.loading = true;
    this.error = '';
    
    this.apiService.getSavedInterviews().subscribe({
      next: (response) => {
        if (response.interviews && response.interviews.length > 0) {
          this.processInterviewData(response.interviews);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading interview data:', error);
        this.error = 'Failed to load interview data. Please try again.';
        this.loading = false;
      }
    });
  }
  
  processInterviewData(interviews: SavedInterview[]): void {
    // Sort interviews by date (newest first)
    const sortedInterviews = [...interviews].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Get recent interviews (top 5)
    const recentInterviews = sortedInterviews.slice(0, 5);
    
    // Calculate scores
    let totalScore = 0;
    let topScore = 0;
    let averageWpm = 0;
    let wpmCount = 0;
    const styleScores: {[key: string]: {total: number, count: number}} = {};
    
    sortedInterviews.forEach(interview => {
      const score = this.extractScoreValue(interview.feedback);
      if (score > 0) {
        totalScore += score;
        if (score > topScore) topScore = score;
        
        // Track scores by interview style
        if (!styleScores[interview.style]) {
          styleScores[interview.style] = {total: 0, count: 0};
        }
        styleScores[interview.style].total += score;
        styleScores[interview.style].count += 1;
      }
      
      // Track WPM if available
      if (interview.wpm) {
        averageWpm += interview.wpm;
        wpmCount++;
      }
    });
    
    // Calculate average score
    const averageScore = sortedInterviews.length > 0 ? 
      parseFloat((totalScore / sortedInterviews.filter(i => this.extractScoreValue(i.feedback) > 0).length).toFixed(1)) : 0;
    
    // Calculate average WPM
    if (wpmCount > 0) {
      this.performanceData.averageWpm = Math.round(averageWpm / wpmCount);
    }
    
    // Calculate speaking pace status
    if (this.performanceData.averageWpm > 160) {
      this.performanceData.speakingPaceStatus = 'Too Fast';
    } else if (this.performanceData.averageWpm < 120) {
      this.performanceData.speakingPaceStatus = 'Too Slow';
    } else {
      this.performanceData.speakingPaceStatus = 'Optimal';
    }
    
    // Calculate average score by category
    const scoreByCategory: {[key: string]: number} = {};
    Object.keys(styleScores).forEach(style => {
      scoreByCategory[style] = Number((styleScores[style].total / styleScores[style].count).toFixed(1));
    });
    
    // Prepare chart data
    const interviewDates = recentInterviews.map(interview => 
      new Date(interview.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
    ).reverse();
    
    const interviewScores = recentInterviews.map(interview => 
      this.extractScoreValue(interview.feedback)
    ).reverse();
    
    // Update progress chart data
    this.progressChartData.scores = interviewScores;
    
    if (wpmCount > 0) {
      this.progressChartData.wpm = recentInterviews
        .filter(interview => interview.wpm)
        .map(interview => interview.wpm || 0)
        .reverse();
    }
    
    // Update the stats
    this.interviewStats = {
      totalInterviews: sortedInterviews.length,
      averageScore: averageScore,
      topScore: topScore,
      recentInterviews: recentInterviews,
      scoreByCategory: scoreByCategory,
      interviewDates: interviewDates,
      interviewScores: interviewScores
    };
    
    // Update the performance data
    this.performanceData.averageScore = this.interviewStats.averageScore;
    this.performanceData.recentInterviews = recentInterviews.map(interview => ({
      date: interview.date,
      topic: interview.question,
      score: this.extractScoreValue(interview.feedback),
      wpm: interview.wpm || 0
    }));
  }
  
  extractScoreValue(feedback: string): number {
    if (!feedback) return 0;
    
    // Different patterns to match various feedback formats
    const patterns = [
      // Format: "Overall assessment: 1/10"
      /assessment:\s*(\d+)\s*\/\s*(\d+)/i,
      // Format: "Overall assessment: 1 out of 10"
      /assessment:\s*(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: "I would rate this response a 6 out of 10"
      /rate\s*this\s*response\s*a\s*(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: "Overall Assessment\nI would rate this response a 6 out of 10"
      /assessment[^\n]*\n[^\n]*rate[^\n]*\s(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: Just direct numbers like "6/10"
      /\b(\d+)\s*\/\s*(\d+)\b/i,
      // Format: "score: 6"
      /score:\s*(\d+)/i
    ];
    
    // Try each pattern until we find a match
    for (const pattern of patterns) {
      const match = feedback.match(pattern);
      if (match && match[1]) {
        const score = parseInt(match[1], 10);
        const scale = match[2] ? parseInt(match[2], 10) : 10;
        // Normalize to a 10-point scale
        return Math.round((score / scale) * 10 * 10) / 10;
      }
    }
    
    return 0;
  }

  extractScore(feedback: string): string {
    if (!feedback) return 'N/A';
    
    // Different patterns to match various feedback formats
    const patterns = [
      // Format: "Overall assessment: 1/10"
      /assessment:\s*(\d+)\s*\/\s*(\d+)/i,
      // Format: "Overall assessment: 1 out of 10"
      /assessment:\s*(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: "I would rate this response a 6 out of 10"
      /rate\s*this\s*response\s*a\s*(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: "Overall Assessment\nI would rate this response a 6 out of 10"
      /assessment[^\n]*\n[^\n]*rate[^\n]*\s(\d+)\s*out\s*of\s*(\d+)/i,
      // Format: Just direct numbers like "6/10"
      /\b(\d+)\s*\/\s*(\d+)\b/i,
      // Format: "score: 6"
      /score:\s*(\d+)/i
    ];
    
    // Try each pattern until we find a match
    for (const pattern of patterns) {
      const match = feedback.match(pattern);
      if (match && match[1]) {
        // If there's a denominator (match[2]) use it, otherwise default to "/10"
        return match[2] ? `${match[1]}/${match[2]}` : `${match[1]}/10`;
      }
    }
    
    return 'N/A';
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
  
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
