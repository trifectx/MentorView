import { Component } from '@angular/core';
import { InterviewComponent } from './pages/interview/interview.component';

import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, InterviewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

}
