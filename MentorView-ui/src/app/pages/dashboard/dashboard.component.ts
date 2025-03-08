import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Navigation methods
  navigateToSection(section: string): void {
    console.log(`Navigating to ${section}`);
    // Implement actual navigation in the future
  }

  // Utility methods for UI interactions
  toggleFavorite(): void {
    console.log('Toggle favorite');
  }

  showInfo(): void {
    console.log('Show info');
  }

  // Course related methods
  startCourse(courseId: string): void {
    console.log(`Starting course ${courseId}`);
  }

  viewAllCourses(category: string): void {
    console.log(`Viewing all courses in ${category}`);
  }
}
