import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, timeout, retry, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * Interface for the assessment centre feedback request payload
 */
export interface AssessmentCentreFeedbackRequest {
  transcript: string;
  question: string;
  role?: string;
  context?: string;
}

/**
 * Interface for the assessment centre feedback response
 */
export interface AssessmentCentreFeedback {
  feedback: string;
  strengths?: string[];
  improvements?: string[];
  score?: number;
  timestamp?: Date;
}

/**
 * Service for handling assessment centre specific operations
 */
@Injectable({
  providedIn: 'root'
})
export class AssessmentCentreService {
  private baseUrl = 'http://localhost:5000';
  private timeoutDuration = 30000; // 30 seconds timeout

  constructor(private http: HttpClient) { }

  /**
   * Handles HTTP errors from API requests
   * @param error The HTTP error response
   * @returns An observable with the error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'The server couldn\'t process this transcript. Please check the audio quality.';
          break;
        case 401:
          errorMessage = 'Authentication error. Please log in again.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 408:
        case 504:
          errorMessage = 'The request timed out. Please try again.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Generates feedback for an assessment centre participant
   * @param data Assessment centre participant data
   * @returns Observable with feedback
   */
  generateParticipantFeedback(data: {
    role: string;
    company: string;
    participantName: string;
    transcript: string;
    question: string;
  }): Observable<AssessmentCentreFeedback> {
    // Validate input data
    if (!data.transcript || data.transcript.trim().length === 0) {
      return throwError(() => new Error('Transcript is required and cannot be empty'));
    }
    
    if (!data.question || data.question.trim().length === 0) {
      return throwError(() => new Error('Question is required and cannot be empty'));
    }
    
    // Use the dedicated assessment centre feedback endpoint
    const payload = {
      role: data.role || 'Candidate',
      company: data.company || 'Assessment Centre',
      transcript: data.transcript,
      question: data.question,
      participantName: data.participantName || 'Participant'
    };
    
    console.log('Sending assessment centre feedback request:', payload);
    
    // Set headers for better error handling
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    return this.http.post<any>(`${this.baseUrl}/assessment_centre_feedback`, payload, { headers }).pipe(
      timeout(this.timeoutDuration),
      retry({ count: 1, delay: 1000 }), // Retry once after 1 second
      map(response => {
        // Process the response to ensure it matches our interface
        const feedback: AssessmentCentreFeedback = {
          feedback: response.feedback || 'No feedback provided',
          timestamp: new Date()
        };
        
        // Add optional fields if they exist
        if (response.strengths && Array.isArray(response.strengths)) {
          feedback.strengths = response.strengths;
        }
        
        if (response.improvements && Array.isArray(response.improvements)) {
          feedback.improvements = response.improvements;
        }
        
        if (response.score !== undefined && !isNaN(Number(response.score))) {
          feedback.score = Number(response.score);
        }
        
        console.log('Assessment centre feedback processed:', feedback);
        return feedback;
      }),
      catchError(error => {
        console.error('Error generating assessment centre feedback:', error);
        // Instead of returning a partial object, throw the error to be handled by the component
        return throwError(() => new Error(error.message || 'Failed to generate feedback. Please try again.'));
      })
    );
  }
}
