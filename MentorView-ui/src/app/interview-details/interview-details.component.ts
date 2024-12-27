import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { INTERVIEW_STYLES, QUESTION_SUGGESTIONS, ROLES, COMPANIES, InterviewStyle, QuestionSuggestions } from './interview-details.constants';
import { InterviewDetails} from '../shared/types';

@Component({
    selector: 'app-interview-details',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatAutocompleteModule,
        MatFormFieldModule
    ],
    templateUrl: './interview-details.component.html',
    styleUrls: ['./interview-details.component.css'],
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
    questionSuggestions: QuestionSuggestions = QUESTION_SUGGESTIONS;
    roles: string[] = ROLES;
    companies: string[] = COMPANIES;

    selectedQuestions: string[] = [];

    onStyleChange(event: MatSelectChange): void {
        const style = event.value;
        this.selectedQuestions = this.questionSuggestions[style] || [];
        this.interviewDetails.style = style;
        this.detailsChange.emit(this.interviewDetails);
    }

    onDetailsChange(): void {
        this.detailsChange.emit(this.interviewDetails);
    }
}