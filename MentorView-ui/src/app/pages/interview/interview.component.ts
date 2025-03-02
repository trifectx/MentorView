import { Component } from '@angular/core';
import { TranscriptionComponent } from '../../components/transcription/transcription.component';
import { InterviewDetailsComponent } from '../../components/interview-details/interview-details.component';
import { InterviewDetails } from '../../shared/types';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [TranscriptionComponent, InterviewDetailsComponent],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent {
  interviewDetails: InterviewDetails = {
        role: '',
        company: '',
        question: '',
        style: ''
    };

    onDetailsChange(details: any) {
        this.interviewDetails = details;
    }
}
