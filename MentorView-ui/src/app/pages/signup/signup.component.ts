import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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
import { AuthService } from '../../services/auth.service';
import { isNull } from 'node:util';

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
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    signupForm!: FormGroup;
    hidePassword = true;
    hideConfirmPassword = true;
    errorMessage: string | null = null;

    ngOnInit(): void {
        this.signupForm = this.fb.nonNullable.group(
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
            const rawForm = this.signupForm.getRawValue();
            this.authService.register(
                rawForm.email,
                rawForm.username,
                rawForm.password
            ).subscribe({
                next: () => {
                    this.router.navigateByUrl('/dashboard');
                },
                error: (err) => {
                    this.errorMessage = err.code;
                }
            });
        }
    }
}