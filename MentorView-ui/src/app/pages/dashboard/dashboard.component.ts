import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LevelIndicatorComponent } from '../../components/level-indicator/level-indicator.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, LevelIndicatorComponent]
})
export class DashboardComponent {
  // Navigation methods
  navigateToSection(section: string): void {
    console.log(`Navigating to ${section}`);
  }

  // Course related methods
  startCourse(courseId: string): void {
    console.log(`Starting course ${courseId}`);
  }

  resumeCourse(courseId: string): void {
    console.log(`Resuming course ${courseId}`);
  }

  showInfo(): void {
    console.log('Show info');
  }
}
