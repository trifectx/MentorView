import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
    ],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
    signupForm!: FormGroup;
    hidePassword = true;
    hideConfirmPassword = true;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.signupForm = this.fb.group(
            {
                username: ['', [
                    Validators.required, 
                    Validators.minLength(3),
                    Validators.pattern('^[a-zA-Z0-9_]+$')
                ]],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8)]],
                confirmPassword: ['', [Validators.required]],
            },
            { validators: this.passwordMatchValidator }
        );
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
        ) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    onSubmit(): void {
        if (this.signupForm.valid) {
            console.log('Form submitted:', this.signupForm.value);
            // You'll connect this to Firebase auth later
            // this.signupForm.value contains username, email and password
        }
    }
}