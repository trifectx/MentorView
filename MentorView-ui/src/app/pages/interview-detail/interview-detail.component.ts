import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService, SavedInterview } from '../../services/api.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-interview-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css']
})
export class InterviewDetailComponent implements OnInit {
  interviewId: string | null = null;
  interview: SavedInterview | null = null;
  loading = true;
  error = '';
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    if (this.interviewId) {
      this.loadInterviewDetails(this.interviewId);
    } else {
      this.error = 'Interview ID not found';
      this.loading = false;
    }
  }

  loadInterviewDetails(id: string): void {
    this.loading = true;
    this.error = '';

    this.apiService.getSavedInterviews().subscribe({
      next: (response) => {
        const foundInterview = response.interviews.find((interview) => interview.id === id);
        if (foundInterview) {
          this.interview = foundInterview;
          this.loading = false;
          
          // Setup video player once data is loaded
          setTimeout(() => {
            if (this.videoPlayer) {
              this.videoPlayer.nativeElement.muted = false; // Unmuted by default
            }
          }, 100);
        } else {
          this.error = 'Interview not found';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading interview details:', error);
        this.error = 'Failed to load interview details. Please try again.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/saved-interviews']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  getDownloadUrl(interviewId: string): string {
    return this.apiService.getDownloadUrl(interviewId);
  }
  
  getStreamUrl(interviewId: string): string {
    return this.apiService.getStreamUrl(interviewId);
  }

  // Extract score from feedback text as a string (e.g. "8/10")
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

  reattemptInterview(): void {
    if (!this.interview) return;
    
    // Navigate to the interview page with the question data
    this.router.navigate(['/interview'], { 
      state: { 
        reattemptData: {
          question: this.interview.question,
          role: this.interview.role,
          company: this.interview.company,
          style: this.interview.style
        }
      }
    });
  }
}
