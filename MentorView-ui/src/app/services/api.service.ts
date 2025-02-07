import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Questions = { questions: string[] };
type Transcript = { transcript: string };
type Rating = { feedback: string };

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:5000';
    private endpoints = {
        questions: `${this.baseUrl}/question_suggestions`,
        upload: `${this.baseUrl}/upload`,
        transcribe: `${this.baseUrl}/transcribe`,
        rateAnswer: `${this.baseUrl}/rate_answer`
    };

    constructor(private http: HttpClient) { }


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
}
