import { Injectable } from '@angular/core';

export interface Question {
  id: string;
  title: string;
  createdAt: number;
}

export interface Stack {
  id: string;
  name: string;
  color: string;
  tags: string;
  company: string;
  interviewStyle: string;
  description: string;
  createdAt: number;
  questions: Question[];
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

  // Get single stack by ID
  getStack(id: string): Stack | undefined {
    const stacks = this.getStacks();
    return stacks.find(stack => stack.id === id);
  }

  // Add a new stack
  addStack(stack: Omit<Stack, 'id' | 'createdAt' | 'questions'>): Stack {
    const stacks = this.getStacks();
    
    const newStack: Stack = {
      ...stack,
      id: 'stack_' + Date.now(),
      createdAt: Date.now(),
      questions: []
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

  // Add a question to a stack
  addQuestionToStack(stackId: string, question: Omit<Question, 'id' | 'createdAt'>): Question | null {
    const stacks = this.getStacks();
    const stackIndex = stacks.findIndex(s => s.id === stackId);
    
    if (stackIndex === -1) {
      return null;
    }
    
    const newQuestion: Question = {
      ...question,
      id: 'question_' + Date.now(),
      createdAt: Date.now()
    };
    
    stacks[stackIndex].questions.push(newQuestion);
    this.saveStacks(stacks);
    
    return newQuestion;
  }

  // Delete a question from a stack
  deleteQuestionFromStack(stackId: string, questionId: string): boolean {
    const stacks = this.getStacks();
    const stackIndex = stacks.findIndex(s => s.id === stackId);
    
    if (stackIndex === -1) {
      return false;
    }
    
    const stack = stacks[stackIndex];
    const initialQuestionCount = stack.questions.length;
    
    stack.questions = stack.questions.filter(q => q.id !== questionId);
    
    if (stack.questions.length !== initialQuestionCount) {
      this.saveStacks(stacks);
      return true;
    }
    
    return false;
  }

  // Private method to save stacks to localStorage
  private saveStacks(stacks: Stack[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stacks));
  }
}
