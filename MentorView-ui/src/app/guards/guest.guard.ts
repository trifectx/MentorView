import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'; // adjust path
import { Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated()
        ? router.createUrlTree(['/dashboard']) // redirect if already logged in
        : true; // allow access if not logged in
};
