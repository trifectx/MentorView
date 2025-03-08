import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranscriptionComponent } from '../../components/transcription/transcription.component';
import { InterviewDetailsComponent } from '../../components/interview-details/interview-details.component';
import { InterviewDetails } from '../../shared/types';
import { INTERVIEW_STYLES, ROLES, COMPANIES, InterviewStyle } from '../../components/interview-details/interview-details.constants';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [
    TranscriptionComponent, 
    InterviewDetailsComponent, 
    FormsModule, 
    CommonModule,
    MatAutocompleteModule
  ],
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  interviewDetails: InterviewDetails = {
    role: 'Sample associate',
    company: 'Costco',
    question: '',
    style: 'behavioral'
  };

  interviewStyles: InterviewStyle[] = INTERVIEW_STYLES;
  roles: string[] = ROLES;
  companies: string[] = COMPANIES;
  selectedQuestions: string[] = [];
  isLoadingQuestions = false;
  showStylesMenu = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.interviewDetails.role && this.interviewDetails.company && this.interviewDetails.style) {
      this.loadQuestions();
    }
  }

  openStylesMenu(): void {
    this.showStylesMenu = !this.showStylesMenu;
  }

  selectInterviewStyle(styleId: string): void {
    this.interviewDetails.style = styleId;
    this.interviewDetails.question = '';
    this.showStylesMenu = false;
    
    if (styleId !== 'custom') {
      this.loadQuestions();
    }
    
    this.onDetailsChange();
  }

  getSelectedStyleName(): string {
    const selectedStyle = this.interviewStyles.find(style => style.id === this.interviewDetails.style);
    return selectedStyle ? selectedStyle.name : 'Select Interview Type';
  }

  onDetailsChange(): void {
    if (this.interviewDetails.role && this.interviewDetails.company && this.interviewDetails.style !== 'custom') {
      this.loadQuestions();
    }
  }

  private loadQuestions(): void {
    if (this.interviewDetails.role && this.interviewDetails.company && this.interviewDetails.style) {
      this.isLoadingQuestions = true;
      this.getQuestions();
    }
  }

  private getQuestions(): void {
    const data = {
      role: this.interviewDetails.role,
      company: this.interviewDetails.company,
      style: this.interviewDetails.style
    }

    this.apiService.getQuestions(data)
      .subscribe({
        next: (response) => {
          this.selectedQuestions = response.questions;
          this.isLoadingQuestions = false;
        },
        error: (error) => {
          console.error('Error fetching questions:', error);
          this.selectedQuestions = [];
          this.isLoadingQuestions = false;
        }
      });
  }
}
