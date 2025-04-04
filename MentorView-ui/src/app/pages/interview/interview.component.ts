import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TranscriptionComponent } from '../../components/transcription/transcription.component';
import { InterviewDetailsComponent } from '../../components/interview-details/interview-details.component';
import { InterviewDetails } from '../../shared/types';
import { INTERVIEW_STYLES, ROLES, COMPANIES, InterviewStyle } from '../../components/interview-details/interview-details.constants';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  dropdownHeight = 0; // Track dropdown height for spacing
  
  // Flag to track if this is a reattempt
  isReattempt = false;
  
  // Track previous values to detect changes
  private previousCompany: string = '';
  private previousRole: string = '';
  private previousStyle: string = '';

  // Debounce subjects for input fields
  private roleInputSubject = new Subject<string>();
  private companyInputSubject = new Subject<string>();

  constructor(private apiService: ApiService, private router: Router) {
    // Set up debounce for role input - wait 800ms after user stops typing
    this.roleInputSubject.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(role => {
      if (role !== this.previousRole && role) {
        this.previousRole = role;
        this.checkAndLoadQuestions();
      }
    });
    
    // Set up debounce for company input - wait 800ms after user stops typing
    this.companyInputSubject.pipe(
      debounceTime(800),
      distinctUntilChanged()
    ).subscribe(company => {
      if (company !== this.previousCompany && company) {
        this.previousCompany = company;
        this.checkAndLoadQuestions();
      }
    });
    
    // Check if we have reattempt data from router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { reattemptData?: any };
      if (state.reattemptData) {
        this.isReattempt = true;
        this.interviewDetails = {
          role: state.reattemptData.role || this.interviewDetails.role,
          company: state.reattemptData.company || this.interviewDetails.company,
          style: state.reattemptData.style || this.interviewDetails.style,
          question: state.reattemptData.question || this.interviewDetails.question
        };
        
        console.log('Reattempting interview with question:', this.interviewDetails.question);
      }
    }
  }

  ngOnInit(): void {
    // Initialize tracking variables with current values to prevent unnecessary reloading
    this.previousCompany = this.interviewDetails.company;
    this.previousRole = this.interviewDetails.role;
    this.previousStyle = this.interviewDetails.style;
    
    // If this is a reattempt and we don't have a specific question yet, load questions
    if (!this.isReattempt && !this.interviewDetails.question) {
      this.checkAndLoadQuestions();
    } else if (this.isReattempt && this.interviewDetails.question) {
      // For reattempts, we already have the question, so we'll add it to the selected questions
      this.selectedQuestions = [this.interviewDetails.question];
    }
  }

  openStylesMenu(): void {
    this.showStylesMenu = !this.showStylesMenu;
    // Set dropdown height based on visibility
    this.dropdownHeight = this.showStylesMenu ? 300 : 0;
  }

  selectInterviewStyle(styleId: string): void {
    // Store previous style to check if it changed
    const styleChanged = this.interviewDetails.style !== styleId;
    
    this.interviewDetails.style = styleId;
    this.interviewDetails.question = '';
    this.showStylesMenu = false;
    this.dropdownHeight = 0;
    
    // Check if style has changed and reload questions if needed
    if (styleId !== 'custom' && styleChanged) {
      this.previousStyle = styleId;
      this.checkAndLoadQuestions();
    }
  }

  getSelectedStyleName(): string {
    const selectedStyle = this.interviewStyles.find(style => style.id === this.interviewDetails.style);
    return selectedStyle ? selectedStyle.name : 'Select Interview Type';
  }

  onRoleInput(): void {
    this.roleInputSubject.next(this.interviewDetails.role);
  }
  
  onCompanyInput(): void {
    this.companyInputSubject.next(this.interviewDetails.company);
  }

  onDetailsChange(): void {
    // No immediate action - debounced inputs will handle changes
  }

  /**
   * Selects a question from the question cards
   * @param question The question to select
   */
  selectQuestion(question: string): void {
    this.interviewDetails.question = question;
    // Removing the onDetailsChange call to prevent questions from reloading
  }

  /**
   * Switches to custom question mode
   */
  addCustomQuestion(): void {
    this.interviewDetails.style = 'custom';
    this.interviewDetails.question = '';
    this.onDetailsChange();
  }

  private checkAndLoadQuestions(): void {
    // Check if we have all required data and if so, load questions
    if (this.interviewDetails.role && 
        this.interviewDetails.company && 
        this.interviewDetails.style !== 'custom') {
      this.loadQuestions();
    }
  }

  private loadQuestions(): void {
    // If already reattempting with a question, don't load new questions
    if (this.isReattempt && this.interviewDetails.question) {
      return;
    }
    
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
