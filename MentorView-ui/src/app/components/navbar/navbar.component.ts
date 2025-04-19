import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LevelIndicatorComponent } from '../level-indicator/level-indicator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [RouterModule, LevelIndicatorComponent]
})
export class NavbarComponent {
  isUserDropdownOpen = false;

  constructor(private authService: AuthService) {}

  toggleUserDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  closeUserDropdown() {
    this.isUserDropdownOpen = false;
  }

  logout() {
    this.isUserDropdownOpen = false;
    this.authService.logout().subscribe();
  }
}