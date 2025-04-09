import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LevelIndicatorComponent } from '../../components/level-indicator/level-indicator.component';
import { StacksService, Stack, Question } from '../../services/stacks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LevelIndicatorComponent]
})
export class DashboardComponent implements OnInit {
  // Dialog states
  showAddStackDialog = false;
  showStackDetailsDialog = false;
  showQuestionError = false;
  
  // Selected stack for details view
  selectedStack: Stack | null = null;
  
  // New stack properties
  newStack = {
    name: '',
    color: 'purple', // Default color
    tags: '',
    company: '',
    interviewStyle: '',
    description: ''
  };

  // New question properties
  newQuestion = {
    title: ''
  };

  // Collection of questions to add to new stack
  newStackQuestions: Omit<Question, 'id' | 'createdAt'>[] = [];

  // Stack collection
  userStacks: Stack[] = [];

  constructor(
    private stacksService: StacksService,
    private router: Router
  ) {}

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
    this.showQuestionError = false;
    // Reset the form
    this.newStack = {
      name: '',
      color: 'purple',
      tags: '',
      company: '',
      interviewStyle: '',
      description: ''
    };
    this.resetNewQuestion();
    this.newStackQuestions = [];
  }

  closeAddStackDialog(): void {
    this.showAddStackDialog = false;
  }

  // Stack details dialog methods
  openStackDetailsDialog(stack: Stack): void {
    this.selectedStack = stack;
    this.showStackDetailsDialog = true;
  }

  closeStackDetailsDialog(): void {
    this.showStackDetailsDialog = false;
    this.selectedStack = null;
  }

  // Stack actions
  practiceStack(stackId?: string): void {
    if (!stackId) return;
    
    const stack = this.stacksService.getStack(stackId);
    if (stack && stack.questions && stack.questions.length > 0) {
      // Navigate to interview component with stack data
      // We'll pass the stack ID and encode the questions in the route
      this.router.navigate(['/interview'], { 
        queryParams: { 
          stackId: stackId,
          mode: 'practice',
          company: stack.company || 'Practice',
          style: stack.interviewStyle || 'Technical'
        }
      });
    } else {
      alert('This stack has no questions to practice. Please add questions first.');
    }
  }

  editStack(stackId?: string): void {
    if (!stackId) return;
    
    const stack = this.stacksService.getStack(stackId);
    if (stack) {
      // Close current dialog
      this.closeStackDetailsDialog();
      
      // Populate form with stack data
      this.newStack = {
        name: stack.name,
        color: stack.color,
        tags: stack.tags,
        company: stack.company,
        interviewStyle: stack.interviewStyle,
        description: stack.description
      };
      
      // Add existing questions
      this.newStackQuestions = stack.questions.map(q => ({
        title: q.title
      }));
      
      // Open add stack dialog in edit mode
      this.showAddStackDialog = true;
    }
  }

  confirmDeleteStack(stackId?: string): void {
    if (!stackId) return;
    
    if (confirm('Are you sure you want to delete this stack? This action cannot be undone.')) {
      this.deleteStack(stackId);
      this.closeStackDetailsDialog();
    }
  }

  // Delete a stack
  deleteStack(id: string): void {
    this.stacksService.deleteStack(id);
    this.loadUserStacks();
  }

  selectColor(color: string): void {
    this.newStack.color = color;
  }

  resetNewQuestion(): void {
    this.newQuestion = {
      title: ''
    };
    this.showQuestionError = false;
  }

  addQuestionToNewStack(): void {
    console.log('Adding question:', this.newQuestion);
    
    if (!this.newQuestion.title.trim()) {
      console.log('Question title is empty, not adding');
      this.showQuestionError = true;
      return;
    }

    try {
      // Add question to collection
      this.newStackQuestions.push({...this.newQuestion});
      console.log('Question added to collection. Current questions:', this.newStackQuestions);
      
      // Reset the question form for next entry
      this.resetNewQuestion();
      
      // Hide error message if it was showing
      this.showQuestionError = false;
    } catch (error) {
      console.error('Error adding question:', error);
    }
  }

  removeQuestionFromNewStack(index: number): void {
    this.newStackQuestions.splice(index, 1);
  }

  createStack(): void {
    console.log('Create stack button clicked');
    console.log('New stack data:', this.newStack);
    console.log('Questions:', this.newStackQuestions);
    
    if (!this.newStack.name.trim()) {
      console.log('Stack name is empty, not creating');
      return;
    }

    try {
      console.log('Attempting to create stack...');
      // Add stack using the service, which creates an empty stack
      const newStack = this.stacksService.addStack(this.newStack);
      console.log('Stack created successfully:', newStack);
      
      // Add all questions to the stack (all questions go under this one stack)
      if (this.newStackQuestions.length > 0) {
        console.log('Adding questions to stack...');
        this.newStackQuestions.forEach(question => {
          const added = this.stacksService.addQuestionToStack(newStack.id, question);
          console.log('Question added:', added);
        });
      }
      
      // Reload stacks
      this.loadUserStacks();
      console.log('Stacks reloaded. Current stacks:', this.userStacks);
      
      // Close the dialog
      this.closeAddStackDialog();
      console.log('Dialog closed');
    } catch (error) {
      console.error('Error creating stack:', error);
    }
  }
}
