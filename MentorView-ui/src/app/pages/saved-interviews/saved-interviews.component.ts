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

  viewInterview(interview: SavedInterview): void {
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
}
