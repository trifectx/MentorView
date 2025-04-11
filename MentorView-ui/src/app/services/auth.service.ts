import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Observable, from} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);
    firestore = inject(Firestore);

    constructor() {}

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
    private createUserDocument(user: User): Promise<void> {
        const userRef = doc(this.firestore, 'users', user.uid);
        return setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName ?? 'User',
            friends: []
        });
    }
}
