import { Component } from '@angular/core';
import { TranscriptionComponent } from './components/transcription/transcription.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { HttpClientModule } from '@angular/common/http';
import { InterviewDetails } from './shared/types';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TranscriptionComponent, InterviewDetailsComponent, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'MentorView-ui';
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
