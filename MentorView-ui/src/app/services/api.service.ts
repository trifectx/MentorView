import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of, tap, throwError } from 'rxjs';

type Questions = { questions: string[] };
type Transcript = { transcript: string };
type Rating = { feedback: string };
type SaveInterviewResponse = { message: string, id: string };
type SavedInterviews = { interviews: SavedInterview[] };
type UpdateInterviewResponse = { message: string, id: string };
type DeleteInterviewResponse = { message: string };

export interface SavedInterview {
    id: string;
    date: string;
    role: string;
    company: string;
    style: string;
    question: string;
    answer: string;
    feedback: string;
    wpm?: number;
    fillerWords?: string;
    totalFillerWords?: number;
    fillerWordsPercentage?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:5000';
    private endpoints = {
        questions: `${this.baseUrl}/question_suggestions`,
        upload: `${this.baseUrl}/upload`,
        transcribe: `${this.baseUrl}/transcribe`,
        rateAnswer: `${this.baseUrl}/rate_answer`,
        saveInterview: `${this.baseUrl}/save_interview`,
        savedInterviews: `${this.baseUrl}/saved_interviews`,
        downloadInterview: `${this.baseUrl}/download_interview`,
        streamInterview: `${this.baseUrl}/stream_interview`,
        updateInterview: `${this.baseUrl}/update_interview`,
        deleteInterview: `${this.baseUrl}/delete_interview`,
        transcribeAudio: `${this.baseUrl}/transcribe_audio`
    };

    // Subject to notify components when interviews are updated
    private interviewsUpdatedSource = new Subject<void>();
    interviewsUpdated$ = this.interviewsUpdatedSource.asObservable();

    constructor(private http: HttpClient) {
        this.baseUrl = this.getBackendUrl();
        
        // Initialize endpoints after baseUrl is set
        this.endpoints = {
            questions: `${this.baseUrl}/question_suggestions`,
            upload: `${this.baseUrl}/upload`,
            transcribe: `${this.baseUrl}/transcribe`,
            rateAnswer: `${this.baseUrl}/rate_answer`,
            saveInterview: `${this.baseUrl}/save_interview`,
            savedInterviews: `${this.baseUrl}/saved_interviews`,
            downloadInterview: `${this.baseUrl}/download_interview`,
            streamInterview: `${this.baseUrl}/stream_interview`,
            updateInterview: `${this.baseUrl}/update_interview`,
            deleteInterview: `${this.baseUrl}/delete_interview`,
            transcribeAudio: `${this.baseUrl}/transcribe_audio`
        };
        
        console.log('API Service initialized with backend URL:', this.baseUrl);
    }
    
    /**
     * Dynamically determines the backend URL to use
     * This allows the app to work with both localhost and ngrok URLs
     * 
     * Note: This method only determines the URL to use, it doesn't check if the backend is actually available.
     * Error handling for unavailable backends is done in the individual API methods.
     */
    public getBackendUrl(): string {
        // Check for stored manual API URL configuration (used with ngrok)
        const storedBackendUrl = sessionStorage.getItem('backendApiUrl');
        if (storedBackendUrl) {
            console.log('Using stored backend URL:', storedBackendUrl);
            return storedBackendUrl;
        }

        // If we're running in development mode and the user is on localhost,
        // we can use the local backend URL
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000';
        }
        
        // For Render deployments, the frontend and backend are served from the same domain
        // so we just use the current origin
        if (window.location.hostname.includes('render') || window.location.hostname.includes('onrender.com')) {
            return window.location.origin;
        }
        
        // For ngrok tunnels
        if (window.location.hostname.includes('ngrok')) {
            // For ngrok, we want to keep the same hostname but change the protocol to https
            return `https://${window.location.hostname}`;
        }
        
        // If we're on any other domain (production deployment, etc.)
        // Use the current origin as both frontend and backend are served from same domain
        return window.location.origin;
    }

    // Method to notify all subscribers that interviews have been updated
    notifyInterviewsUpdated() {
        this.interviewsUpdatedSource.next();
    }

    uploadVideo(videoBlob: Blob): Observable<void> {
        const formData = new FormData();
        formData.append('file', videoBlob);
        return this.http.post<void>(this.endpoints.upload, formData);
    }

    transcribeVideo(): Observable<Transcript> {
        return this.http.get<Transcript>(this.endpoints.transcribe);
    }

    rateAnswer(data: {
        role: string;
        company: string;
        style: string;
        transcript: string;
        question: string;
        wpm?: number;
        fillerWords?: { [key: string]: number };
        totalFillerWords?: number;
    }): Observable<Rating> {
        return this.http.post<Rating>(this.endpoints.rateAnswer, data);
    }

    getQuestions(data: {
        role: string,
        company: string,
        style: string
    }): Observable<Questions> {
        return this.http.post<Questions>(this.endpoints.questions, data);
    }

    saveInterview(data: {
        role: string;
        company: string;
        style: string;
        question: string;
        transcript: string;
        feedback?: string;
        wpm?: number;
        fillerWords?: string;
        totalFillerWords?: number;
        fillerWordsPercentage?: number;
    }): Observable<SaveInterviewResponse> {
        const saveObservable = this.http.post<SaveInterviewResponse>(this.endpoints.saveInterview, data);

        // Add observer to notify when save completes
        saveObservable.subscribe({
            next: () => this.notifyInterviewsUpdated()
        });

        return saveObservable;
    }

    getSavedInterviews(): Observable<SavedInterviews> {
        return this.http.get<SavedInterviews>(this.endpoints.savedInterviews);
    }

    getSavedInterviewById(id: string): Observable<SavedInterview> {
        return this.http.get<SavedInterview>(`${this.endpoints.savedInterviews}/${id}`);
    }

    getDownloadUrl(interviewId: string): string {
        return `${this.endpoints.downloadInterview}/${interviewId}`;
    }

    getStreamUrl(interviewId: string): string {
        return `${this.endpoints.streamInterview}/${interviewId}`;
    }

    updateInterview(interviewId: string, data: {
        role?: string;
        company?: string;
    }): Observable<UpdateInterviewResponse> {
        const updateObservable = this.http.put<UpdateInterviewResponse>(`${this.endpoints.updateInterview}/${interviewId}`, data);

        // Add observer to notify when update completes
        updateObservable.subscribe({
            next: () => this.notifyInterviewsUpdated()
        });

        return updateObservable;
    }

    deleteInterview(interviewId: string): Observable<DeleteInterviewResponse> {
        const deleteObservable = this.http.delete<DeleteInterviewResponse>(`${this.endpoints.deleteInterview}/${interviewId}`);

        // Add observer to notify when delete completes
        deleteObservable.subscribe({
            next: () => this.notifyInterviewsUpdated()
        });

        return deleteObservable;
    }

    /**
     * Send audio file to backend for transcription
     * @param formData FormData containing audio file and participant info
     * @returns Observable with transcription response
     */
    uploadAudioForTranscription(formData: FormData): Observable<any> {
        const url = 'http://localhost:5000/transcribe_audio';
        
        // Add detailed logging
        console.log('Uploading audio for transcription...');
        
        return this.http.post<any>(url, formData).pipe(
          tap(response => {
            console.log('Transcription response:', response);
          }),
          catchError(error => {
            console.error('Error during audio transcription:', error);
            return throwError(() => new Error(`Transcription failed: ${error.message || 'Unknown error'}`));
          })
        );
    }
    
    /**
     * Simpler method to transcribe an audio file directly
     * @param audioBlob The audio blob to transcribe
     * @returns Observable with transcription response
     */
    transcribeAudioFile(audioBlob: Blob): Observable<Transcript> {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio_recording.webm');
        
        // Send directly to the transcribeAudio endpoint
        return this.http.post<Transcript>(this.endpoints.transcribeAudio, formData).pipe(
          tap(response => {
            console.log('Direct transcription response:', response);
          }),
          catchError(error => {
            console.error('Error during direct audio transcription:', error);
            return throwError(() => new Error(`Direct transcription failed: ${error.message || 'Unknown error'}`));
          })
        );
    }

    /**
     * Checks the status of the API
     * @returns Observable with API status
     */
    checkApiStatus(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/status`).pipe(
            catchError(error => {
                console.error('API status check failed:', error);
                return of({ status: 'error', message: error.message });
            })
        );
    }

    /**
     * Rates the response of a participant in an assessment centre session
     * @param data Participant data including transcript and question
     * @returns Observable with feedback for the participant
     */
    rateParticipantResponse(data: {
        role: string;
        company: string;
        participantName: string;
        transcript: string;
        question: string;
    }): Observable<Rating> {
        // Use exactly the same structure as the normal rateAnswer method
        // but include a special note in the transcript to indicate this is for assessment centre
        const cleanTranscript = data.transcript.trim();
        
        // Format the transcript to include participant name and context
        const formattedTranscript = `[Assessment Centre Participant: ${data.participantName}] ${cleanTranscript}`;
        
        // Create the exact same payload structure as the interview component uses
        const payload = {
            role: data.role,
            company: data.company,
            style: 'assessment-centre',
            transcript: formattedTranscript,
            question: data.question,
            // Include optional fields with default values
            wpm: 0,
            fillerWords: {},
            totalFillerWords: 0
        };
        
        console.log('Sending participant feedback request with payload:', payload);
        
        // Use a more detailed error handler to help diagnose the issue
        return this.http.post<Rating>(this.endpoints.rateAnswer, payload).pipe(
            tap(response => {
                console.log('Successfully received feedback response:', response);
            }),
            catchError(error => {
                console.error('Error rating participant response:', error);
                
                // Log detailed information about the error
                if (error.error) {
                    console.error('Error details:', error.error);
                }
                
                if (error.status === 400) {
                    console.error('Bad request details:', error.error);
                }
                
                return throwError(() => new Error(`Feedback generation failed: ${error.message || 'Unknown error'}`));
            })
        );
    }
}
