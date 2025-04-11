import { inject, Injectable, signal, computed, effect } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user as firebaseUser, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInterface } from '../shared/user.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);
    firestore = inject(Firestore);

    // Signal version of the Firebase user observable
    private fbUser = toSignal(firebaseUser(this.firebaseAuth), { initialValue: null });

     // Lightweight user info object
    currentUser = signal<UserInterface | null | undefined>(undefined);

    // True if logged in
    isAuthenticated = computed(() => !!this.currentUser());

    constructor() {
        effect(() => {
            const user = this.fbUser();
            if (user) {
                this.currentUser.set({
                    displayName: user.displayName!,
                    email: user.email!,
                });
            }
            else {
                this.currentUser.set(null);
            }
        })
    }

    register(
        email: string,
        username: string,
        password: string
    ): Observable<void> {
        const promise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(response => {
            return updateProfile(response.user, { displayName: username })
                .then(() => {
                    return this.createUserDocument(response.user);
                });
        });

        return from(promise);
    }

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth, 
            email, 
            password
        ).then(() => {});
        return from(promise);
    }

    logout(): Observable<void> {
        const promise = signOut(this.firebaseAuth);
        return from(promise);
    }

    /**
     * Create the user document in Firestore after successful registration
     * @param user - The user object returned from Firebase Auth
     * @returns a Promise that resolves when the document is created
     */
    private createUserDocument(user: FirebaseUser): Promise<void> {
        const userRef = doc(this.firestore, 'users', user.uid);
        return setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName ?? 'User',
            friends: []
        });
    }
}
