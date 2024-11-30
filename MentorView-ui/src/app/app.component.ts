import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranscriptionComponent } from './components/transcription/transcription.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TranscriptionComponent, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MentorView-ui';
}