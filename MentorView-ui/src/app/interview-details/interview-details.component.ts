import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-interview-details',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './interview-details.component.html',
    styleUrls: ['./interview-details.component.css'],
})
export class InterviewDetailsComponent {
    @Output() detailsChange = new EventEmitter<any>();

    interviewDetails = {
        role: '',
        company: '',
        question: '',
        style: ''
    };

    interviewStyles = [
        { id: 'behavioral', name: 'Behavioral Interview' },
        { id: 'technical', name: 'Technical Interview' },
        { id: 'system_design', name: 'System Design Interview' },
        { id: 'leadership', name: 'Leadership Interview' },
        { id: 'general', name: 'General Interview' }
    ];

    questionSuggestions: { [key: string]: string[] } = {
        'behavioral': [
            'Tell me about a time you faced a difficult challenge at work',
            'Describe a situation where you had to work with a difficult team member',
            'Give an example of a goal you reached and how you achieved it'
        ],
        'technical': [
            'Explain how you would implement a binary search tree',
            'How would you optimize a slow-performing database query?',
            'Describe the differences between REST and GraphQL'
        ],
        'system_design': [
            'Design a URL shortening service like bit.ly',
            'How would you design Twitter\'s backend?',
            'Design a distributed cache system'
        ],
        'leadership': [
            'Tell me about a time you had to make a difficult decision as a leader',
            'How do you motivate your team members?',
            'Describe your approach to managing conflicting priorities'
        ],
        'general': [
            'Why are you interested in this position?',
            'Where do you see yourself in 5 years?',
            'What are your greatest strengths and weaknesses?'
        ]
    };

    selectedQuestions: string[] = [];

    onStyleChange(event: Event): void {
        const select = event.target as HTMLSelectElement;
        const style = select.value;
        this.selectedQuestions = this.questionSuggestions[style] || [];
        this.interviewDetails.style = style;
    }

    onDetailsChange(): void {
        this.detailsChange.emit(this.interviewDetails);
    }
}