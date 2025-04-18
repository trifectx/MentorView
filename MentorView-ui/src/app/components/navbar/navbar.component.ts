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
  isUserDropdownOpen = false;

  toggleUserDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  closeUserDropdown() {
    this.isUserDropdownOpen = false;
  }
}