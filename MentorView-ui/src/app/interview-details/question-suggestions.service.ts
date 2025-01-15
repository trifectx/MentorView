import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionSuggestionsService {
  private apiUrl = 'http://localhost:5000/qsuggestions';

  constructor(private http: HttpClient) {}

  getQuestions(role: string, company: string, style: string): Observable<{questions: string[]}> {
    return this.http.post<{questions: string[]}>(this.apiUrl, {
      role,
      company,
      style
    });
  }
}
