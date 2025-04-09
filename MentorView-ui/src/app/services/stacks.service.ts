import { Injectable } from '@angular/core';

export interface Stack {
  id: string;
  name: string;
  color: string;
  tags: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class StacksService {
  private readonly STORAGE_KEY = 'mentorview_stacks';
  
  constructor() { }

  // Get all stacks
  getStacks(): Stack[] {
    const stacksJson = localStorage.getItem(this.STORAGE_KEY);
    return stacksJson ? JSON.parse(stacksJson) : [];
  }

  // Add a new stack
  addStack(stack: Omit<Stack, 'id' | 'createdAt'>): Stack {
    const stacks = this.getStacks();
    
    const newStack: Stack = {
      ...stack,
      id: 'stack_' + Date.now(),
      createdAt: Date.now()
    };
    
    stacks.push(newStack);
    this.saveStacks(stacks);
    
    return newStack;
  }

  // Update an existing stack
  updateStack(stack: Stack): void {
    const stacks = this.getStacks();
    const index = stacks.findIndex(s => s.id === stack.id);
    
    if (index !== -1) {
      stacks[index] = stack;
      this.saveStacks(stacks);
    }
  }

  // Delete a stack
  deleteStack(id: string): void {
    const stacks = this.getStacks();
    const filteredStacks = stacks.filter(s => s.id !== id);
    
    if (filteredStacks.length !== stacks.length) {
      this.saveStacks(filteredStacks);
    }
  }

  // Private method to save stacks to localStorage
  private saveStacks(stacks: Stack[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stacks));
  }
}
