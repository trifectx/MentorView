import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Utility that returns true if user is authenticated, or redirects to login.
 */
export function requireAuth(): boolean | UrlTree {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated() 
        ? true 
        : router.createUrlTree(['/login']);
}

/**
 * Utility that returns true if user is NOT authenticated, or redirects to dashboard.
 */
export function redirectIfAuthenticated(): boolean | UrlTree {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated() 
        ? router.createUrlTree(['/dashboard']) 
        : true;
}

