import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LevelIndicatorComponent } from '../../components/level-indicator/level-indicator.component';
import { StacksService, Stack } from '../../services/stacks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LevelIndicatorComponent]
})
export class DashboardComponent implements OnInit {
  // Dialog state
  showAddStackDialog = false;
  
  // New stack properties
  newStack = {
    name: '',
    color: 'purple', // Default color
    tags: ''
  };

  // Stack collection
  userStacks: Stack[] = [];

  constructor(private stacksService: StacksService) {}

  ngOnInit(): void {
    // Load user stacks from service
    this.loadUserStacks();
  }

  // Load stacks from service
  loadUserStacks(): void {
    this.userStacks = this.stacksService.getStacks();
  }

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

  // Stack dialog methods
  openAddStackDialog(): void {
    this.showAddStackDialog = true;
    // Reset the form
    this.newStack = {
      name: '',
      color: 'purple',
      tags: ''
    };
  }

  closeAddStackDialog(): void {
    this.showAddStackDialog = false;
  }

  selectColor(color: string): void {
    this.newStack.color = color;
  }

  createStack(): void {
    if (!this.newStack.name.trim()) {
      // Could add validation message here
      return;
    }

    // Add stack using the service
    this.stacksService.addStack(this.newStack);
    
    // Reload stacks
    this.loadUserStacks();
    
    // Close the dialog
    this.closeAddStackDialog();
  }

  // Delete a stack
  deleteStack(id: string): void {
    this.stacksService.deleteStack(id);
    this.loadUserStacks();
  }
}
