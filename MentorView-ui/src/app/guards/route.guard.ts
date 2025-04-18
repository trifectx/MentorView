import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take, filter } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

/**
 * Creates a guard that waits for auth initialization before executing the provided guard function.
 */
function createAuthGuard(
    guardFunction: (isAuthenticated: boolean, router: Router) => boolean | UrlTree): Observable<boolean | UrlTree> {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Convert authInitialized signal to observable
    const authInitialized$ = toObservable(authService.authInitialized);

    // Wait for auth to be initialized before making a decision
    return authInitialized$.pipe(
        filter((initialized) => initialized),
        take(1),
        map(() => guardFunction(authService.isAuthenticated(), router))
    );
}

/**
 * Redirect to login if unauthenticated.
 * 
 * This is used for protected routes like dashboard, interview, etc.
 */
export function requireAuth(): Observable<boolean | UrlTree> {
    return createAuthGuard((isAuthenticated, router) =>
        isAuthenticated
            ? true
            : router.createUrlTree(['/login'])
    );
}

/**
 * Redirect to dashboard if authenticated.
 * 
 * This is used for public routes like login and signup.
 */
export function redirectIfAuthenticated(): Observable<boolean | UrlTree> {
    return createAuthGuard((isAuthenticated, router) =>
        isAuthenticated
            ? router.createUrlTree(['/dashboard'])
            : true
    );
}
