import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, SavedInterview } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { FillerWordsService, FillerWordData, UserFillerWordHistory } from '../../services/filler-words.service';

interface InterviewStats {
  totalInterviews: number;
  averageScore: number;
  topScore: number;
  recentInterviews: SavedInterview[];
  scoreByCategory: { [key: string]: number };
  interviewDates: string[];
  interviewScores: number[];
}

// Standard speaking rate values for reference
const DEFAULT_WPM = 135;  // Only used when no interviews have WPM data
const MIN_OPTIMAL_WPM = 120;
const MAX_OPTIMAL_WPM = 160;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class OverviewComponent implements OnInit, OnDestroy {
  // Performance data structure
  performanceData = {
    strengths: ['Clear communication', 'Good pacing', 'Structured answers'],
    weaknesses: ['Occasional filler words', 'Limited eye contact', 'Can improve technical depth'],
    averageWpm: DEFAULT_WPM,
    speakingPaceStatus: 'Optimal',  // 'Too Fast', 'Too Slow', or 'Optimal'
    averageScore: 0,  // Out of 10
    recentInterviews: [] // Will be populated from actual data
  };

  // Filler word data
  fillerWordData: FillerWordData | null = null;
  fillerWordHistory: UserFillerWordHistory[] = [];
  aggregatedFillerWordData: FillerWordData | null = null;
  loadingFillerData = false;
  fillerDataError = '';
  maxRetries = 3;
  currentRetry = 0;

  // Historical filler words data for the line graph
  fillerWordsHistory = {
    dates: [] as string[],
    percentages: [] as number[]
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
  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private fillerWordsService: FillerWordsService
  ) {}

  ngOnInit(): void {
    // Wait a moment for Firebase auth to initialize properly
    setTimeout(() => {
      // Fetch the saved interviews data
      this.loadInterviewData();

      // Fetch filler word data
      this.loadFillerWordData();

      // Subscribe to interview updates
      this.subscription.add(
        this.apiService.interviewsUpdated$.subscribe(() => {
          console.log('Interview data updated, refreshing overview...');
          this.loadInterviewData();
          this.loadFillerWordData();
        })
      );
    }, 500);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    this.subscription.unsubscribe();
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

  loadFillerWordData(): void {
    this.loadingFillerData = true;
    this.fillerDataError = '';
    this.currentRetry = 0;

    console.log('Starting to load filler word data...');

    // Try to load from local storage first (for quick display while Firebase loads)
    this.tryLoadFromLocalStorage();

    // Then load from Firebase
    this.loadFromFirebase();
  }

  /**
   * Try to load saved filler word data from local storage
   */
  tryLoadFromLocalStorage(): void {
    try {
      // Check for saved aggregated data in localStorage
      const savedData = localStorage.getItem('fillerWordAggregatedData');
      if (savedData) {
        this.aggregatedFillerWordData = JSON.parse(savedData);
        console.log('Loaded filler word data from local storage:', this.aggregatedFillerWordData);
      }

      // Check for saved history data
      const savedHistory = localStorage.getItem('fillerWordHistory');
      if (savedHistory) {
        this.fillerWordsHistory = JSON.parse(savedHistory);
        console.log('Loaded filler word history from local storage:', this.fillerWordsHistory);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }

  /**
   * Load filler word data from Firebase
   */
  loadFromFirebase(): void {
    // First get the current data
    this.subscription.add(
      this.fillerWordsService.getCurrentFillerWordData().subscribe({
        next: (data) => {
          this.fillerWordData = data;
          console.log('Current filler word data loaded:', data);

          if (data) {
            // Then get the history data
            this.subscription.add(
              this.fillerWordsService.getFillerWordHistory().subscribe({
                next: (history) => {
                  this.fillerWordHistory = history;
                  console.log('Filler word history loaded:', history);

                  if (history && history.length > 0) {
                    // Aggregate data across all interviews
                    this.aggregateFillerWordData();
                    console.log('Aggregated data:', this.aggregatedFillerWordData);

                    // Prepare data for the line graph
                    this.prepareHistoricalGraphData();
                    console.log('Graph data prepared:', this.fillerWordsHistory);

                    // Save the aggregated data to localStorage for persistence
                    this.saveToLocalStorage();
                  } else if (this.currentRetry < this.maxRetries) {
                    console.log(`No history data found, retrying (${this.currentRetry + 1}/${this.maxRetries})...`);
                    this.currentRetry++;
                    setTimeout(() => this.loadFromFirebase(), 1000);
                    return;
                  }

                  this.loadingFillerData = false;
                },
                error: (error) => {
                  console.error('Error loading filler word history:', error);
                  this.fillerDataError = 'Failed to load filler word history.';

                  if (this.currentRetry < this.maxRetries) {
                    console.log(`Error loading history, retrying (${this.currentRetry + 1}/${this.maxRetries})...`);
                    this.currentRetry++;
                    setTimeout(() => this.loadFromFirebase(), 1000);
                    return;
                  }

                  this.loadingFillerData = false;
                }
              })
            );
          } else if (this.currentRetry < this.maxRetries) {
            console.log(`No current data found, retrying (${this.currentRetry + 1}/${this.maxRetries})...`);
            this.currentRetry++;
            setTimeout(() => this.loadFromFirebase(), 1000);
            return;
          } else {
            this.loadingFillerData = false;
          }
        },
        error: (error) => {
          console.error('Error loading filler word data:', error);
          this.fillerDataError = 'Failed to load filler word data.';

          if (this.currentRetry < this.maxRetries) {
            console.log(`Error loading data, retrying (${this.currentRetry + 1}/${this.maxRetries})...`);
            this.currentRetry++;
            setTimeout(() => this.loadFromFirebase(), 1000);
            return;
          }

          this.loadingFillerData = false;
        }
      })
    );
  }

  /**
   * Save aggregated data and graph data to localStorage
   */
  saveToLocalStorage(): void {
    try {
      if (this.aggregatedFillerWordData) {
        localStorage.setItem('fillerWordAggregatedData', JSON.stringify(this.aggregatedFillerWordData));
      }

      if (this.fillerWordsHistory.dates.length > 0) {
        localStorage.setItem('fillerWordHistory', JSON.stringify(this.fillerWordsHistory));
      }

      console.log('Saved filler word data to localStorage');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
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
    let totalWpm = 0;
    let wpmCount = 0;

    // Map of interview style to scores
    const styleScores: { [key: string]: { total: number, count: number } } = {};

    sortedInterviews.forEach(interview => {
      // Process score
      const score = this.extractScoreValue(interview.feedback);
      if (score > 0) {
        totalScore += score;
        if (score > topScore) topScore = score;

        // Track scores by interview style
        if (!styleScores[interview.style]) {
          styleScores[interview.style] = { total: 0, count: 0 };
        }
        styleScores[interview.style].total += score;
        styleScores[interview.style].count += 1;
      }

      // Process WPM - only include interviews with actual WPM data
      if (interview.wpm && interview.wpm > 0) {
        totalWpm += interview.wpm;
        wpmCount++;
      }
    });

    // Calculate average score for interviews with feedback
    const interviewsWithScores = sortedInterviews.filter(i => this.extractScoreValue(i.feedback) > 0);
    const averageScore = interviewsWithScores.length > 0 ?
      parseFloat((totalScore / interviewsWithScores.length).toFixed(1)) : 0;

    // Calculate average WPM - only using interviews with actual WPM data
    if (wpmCount > 0) {
      this.performanceData.averageWpm = Math.round(totalWpm / wpmCount);
    } else {
      // Only use default if there are no WPM data points at all
      this.performanceData.averageWpm = DEFAULT_WPM;
    }

    // Calculate speaking pace status
    if (this.performanceData.averageWpm > MAX_OPTIMAL_WPM) {
      this.performanceData.speakingPaceStatus = 'Too Fast';
    } else if (this.performanceData.averageWpm < MIN_OPTIMAL_WPM) {
      this.performanceData.speakingPaceStatus = 'Too Slow';
    } else {
      this.performanceData.speakingPaceStatus = 'Optimal';
    }

    // Calculate average score by category
    const scoreByCategory: { [key: string]: number } = {};
    Object.keys(styleScores).forEach(style => {
      scoreByCategory[style] = Number((styleScores[style].total / styleScores[style].count).toFixed(1));
    });

    // Prepare chart data
    const interviewDates = recentInterviews.map(interview =>
      new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ).reverse();

    const interviewScores = recentInterviews.map(interview =>
      this.extractScoreValue(interview.feedback)
    ).reverse();

    // Update progress chart data
    this.progressChartData.scores = interviewScores;

    // Only include interviews with actual WPM data in the chart
    const wpmDataPoints = recentInterviews
      .filter(interview => interview.wpm && interview.wpm > 0)
      .map(interview => interview.wpm as number)
      .reverse();

    if (wpmDataPoints.length > 0) {
      this.progressChartData.wpm = wpmDataPoints;
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
      wpm: interview.wpm || 0  // Use 0 to indicate no WPM data available
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

  aggregateFillerWordData(): void {
    if (!this.fillerWordHistory || this.fillerWordHistory.length === 0) {
      this.aggregatedFillerWordData = this.fillerWordData;
      return;
    }

    // Initialize aggregated data
    let totalFillerWords = 0;
    let totalWords = 0;
    const aggregatedWordCounts: { [key: string]: number } = {};

    // Combine data from all history entries
    this.fillerWordHistory.forEach(entry => {
      totalFillerWords += entry.totalFillerWords;
      totalWords += entry.totalWords;

      // Aggregate word counts
      Object.entries(entry.wordCounts).forEach(([word, count]) => {
        if (aggregatedWordCounts[word]) {
          aggregatedWordCounts[word] += count;
        } else {
          aggregatedWordCounts[word] = count;
        }
      });
    });

    // Calculate the percentage
    const percentage = totalWords > 0 ? (totalFillerWords / totalWords) * 100 : 0;

    // Create aggregated data object
    this.aggregatedFillerWordData = {
      wordCounts: aggregatedWordCounts,
      totalFillerWords: totalFillerWords,
      totalWords: totalWords,
      percentage: parseFloat(percentage.toFixed(2)),
      lastUpdated: new Date().toISOString()
    };
  }

  prepareHistoricalGraphData(): void {
    if (!this.fillerWordHistory || this.fillerWordHistory.length === 0) {
      return;
    }

    // Sort history by date (oldest first)
    const sortedHistory = [...this.fillerWordHistory].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Take the last 7 entries (or fewer if we don't have that many)
    const recentHistory = sortedHistory.slice(-7);

    // Format dates and extract percentages
    this.fillerWordsHistory = {
      dates: recentHistory.map(entry => this.formatDate(entry.date)),
      percentages: recentHistory.map(entry => entry.percentage)
    };
  }

  formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  getTopFillerWords(): { word: string, count: number }[] {
    // Use aggregated data if available, otherwise fall back to current data
    const data = this.aggregatedFillerWordData || this.fillerWordData;

    if (!data || !data.wordCounts) return [];

    return Object.entries(data.wordCounts)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Return top 5 filler words
  }

  getFillerWordClass(): string {
    // Use aggregated data if available, otherwise fall back to current data
    const data = this.aggregatedFillerWordData || this.fillerWordData;
    if (!data) return '';

    const percentage = data.percentage;
    if (percentage <= 3) return 'status-excellent';
    if (percentage <= 6) return 'status-good';
    if (percentage <= 9) return 'status-average';
    return 'status-needs-improvement';
  }

  getFillerWordStatus(): string {
    // Use aggregated data if available, otherwise fall back to current data
    const data = this.aggregatedFillerWordData || this.fillerWordData;
    if (!data) return '';

    const percentage = data.percentage;
    if (percentage <= 3) return 'Excellent';
    if (percentage <= 6) return 'Good';
    if (percentage <= 9) return 'Average';
    return 'Needs Improvement';
  }

  createLineGraphPoints(percentages: number[]): string {
    if (!percentages || percentages.length === 0) return '';

    // Each data point will be spaced 100px apart
    const points = percentages.map((percentage, index) => {
      const x = index * 100;
      // Invert the y-coordinate since SVG's (0,0) is at the top-left
      // Scale the percentage by 10 to make it more visible on the graph
      const y = 200 - (percentage * 10);
      return `${x},${y}`;
    });

    return points.join(' ');
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
