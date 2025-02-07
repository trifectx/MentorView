import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { INTERVIEW_STYLES, ROLES, COMPANIES, InterviewStyle } from './interview-details.constants';
import { InterviewDetails } from '../../shared/types';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-interview-details',
    templateUrl: './interview-details.component.html',
    styleUrls: ['./interview-details.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
    ],
})
export class InterviewDetailsComponent {
    @Output() detailsChange = new EventEmitter<InterviewDetails>();

    interviewDetails: InterviewDetails = {
        role: '',
        company: '',
        question: '',
        style: ''
    };

    interviewStyles: InterviewStyle[] = INTERVIEW_STYLES;
    roles: string[] = ROLES;
    companies: string[] = COMPANIES;
    selectedQuestions: string[] = [];
    isLoadingQuestions = false;

    constructor(private apiService: ApiService) { }

    getSelectedStyleName(): string {
        const selectedStyle = this.interviewStyles.find(style => style.id === this.interviewDetails.style);
        return selectedStyle ? selectedStyle.name : '';
    }

    onStyleChange(event: MatSelectChange): void {
        const style = event.value;
        this.interviewDetails.style = style;
        this.interviewDetails.question = '';

        if (style !== 'custom') {
            this.loadQuestions();
        }
        this.detailsChange.emit(this.interviewDetails);
    }

    onDetailsChange(): void {
        this.detailsChange.emit(this.interviewDetails);
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
