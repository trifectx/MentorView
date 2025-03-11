import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

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
        deleteInterview: `${this.baseUrl}/delete_interview`
    };

    // Subject to notify components when interviews are updated
    private interviewsUpdatedSource = new Subject<void>();
    interviewsUpdated$ = this.interviewsUpdatedSource.asObservable();

    constructor(private http: HttpClient) { }

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
}
