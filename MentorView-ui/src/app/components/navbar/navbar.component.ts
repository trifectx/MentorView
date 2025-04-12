import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LevelIndicatorComponent } from '../level-indicator/level-indicator.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterModule, LevelIndicatorComponent]
})
export class NavbarComponent {
  // Add any navigation-related properties or methods here
}