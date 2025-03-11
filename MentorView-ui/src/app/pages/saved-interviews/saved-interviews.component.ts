import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, SavedInterview } from '../../services/api.service';

@Component({
  selector: 'app-saved-interviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-interviews.component.html',
  styleUrls: ['./saved-interviews.component.css']
})
export class SavedInterviewsComponent implements OnInit {
  savedInterviews: SavedInterview[] = [];
  loading = false;
  error = '';
  selectedInterview: SavedInterview | null = null;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  
  // Selection state variables
  selectedInterviews: Set<string> = new Set<string>();
  selectionMode = false;
  deleting = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadSavedInterviews();
  }

  loadSavedInterviews(): void {
    this.loading = true;
    this.error = '';

    this.apiService.getSavedInterviews().subscribe({
      next: (response) => {
        this.savedInterviews = response.interviews;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading saved interviews:', error);
        this.error = 'Failed to load saved interviews. Please try again.';
        this.loading = false;
      }
    });
  }

  viewInterview(interview: SavedInterview, event?: MouseEvent): void {
    // If in selection mode, toggle selection instead of viewing
    if (this.selectionMode) {
      if (event) event.stopPropagation();
      this.toggleInterviewSelection(interview.id);
      return;
    }
    
    this.selectedInterview = interview;
    // Wait for the view to update with the video element
    setTimeout(() => {
      if (this.videoPlayer) {
        this.videoPlayer.nativeElement.muted = true; // Start muted by default
      }
    }, 100);
  }

  closeDetails(): void {
    // Pause the video when closing the modal
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.pause();
    }
    this.selectedInterview = null;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  goToInterviewPage(): void {
    this.router.navigate(['/interview']);
  }
  
  getDownloadUrl(interviewId: string): string {
    return this.apiService.getDownloadUrl(interviewId);
  }
  
  getStreamUrl(interviewId: string): string {
    return this.apiService.getStreamUrl(interviewId);
  }
  
  // Extract score from feedback text
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
  
  // Extract score from feedback text as a number normalized to a 10-point scale
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
  
  // Calculate the average score of all interviews
  calculateAverageScore(): number {
    if (!this.savedInterviews || this.savedInterviews.length === 0) {
      return 0;
    }
    
    let totalScore = 0;
    let countedInterviews = 0;
    
    this.savedInterviews.forEach(interview => {
      const score = this.extractScoreValue(interview.feedback);
      if (score > 0) {
        totalScore += score;
        countedInterviews++;
      }
    });
    
    return countedInterviews > 0 ? parseFloat((totalScore / countedInterviews).toFixed(1)) : 0;
  }
  
  // Multi-select functionality
  toggleSelectionMode(): void {
    this.selectionMode = !this.selectionMode;
    if (!this.selectionMode) {
      // Clear selections when exiting selection mode
      this.selectedInterviews.clear();
    }
  }
  
  toggleInterviewSelection(interviewId: string): void {
    if (this.selectedInterviews.has(interviewId)) {
      this.selectedInterviews.delete(interviewId);
    } else {
      this.selectedInterviews.add(interviewId);
    }
  }
  
  isInterviewSelected(interviewId: string): boolean {
    return this.selectedInterviews.has(interviewId);
  }
  
  getSelectedCount(): number {
    return this.selectedInterviews.size;
  }
  
  deleteSelectedInterviews(): void {
    if (this.selectedInterviews.size === 0) return;
    
    this.deleting = true;
    const interviewIds = Array.from(this.selectedInterviews);
    
    // Use a local array to track interviews that need to be removed from UI
    const interviewsToRemove = this.savedInterviews.filter(interview => 
      this.selectedInterviews.has(interview.id)
    );
    
    // Remove selected interviews from the UI immediately
    this.savedInterviews = this.savedInterviews.filter(interview => 
      !this.selectedInterviews.has(interview.id)
    );
    
    // Reset selection state
    this.selectedInterviews.clear();
    this.selectionMode = false;
    this.deleting = false;
  }
}
