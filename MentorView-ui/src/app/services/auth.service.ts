import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from, switchMap, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);
    firestore = inject(Firestore);

    constructor() {
        // Ensure user document exists when auth state changes
        onAuthStateChanged(this.firebaseAuth, (user) => {
            if (user) {
                this.ensureUserDocumentExists(user);
            }
        });
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
                    // Create user document in Firestore
                    return setDoc(doc(this.firestore, 'users', response.user.uid), {
                        uid: response.user.uid,
                        email: response.user.email,
                        displayName: username,
                        friends: []
                    });
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

    /**
     * Ensures that a user document exists in Firestore
     * This will create it if it doesn't exist
     */
    private async ensureUserDocumentExists(user: any): Promise<void> {
        if (!user || !user.uid) {
            console.warn('Cannot create user document - no user UID');
            return;
        }

        console.log('Checking if user document exists:', user.uid);
        const userRef = doc(this.firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
            console.log('User document does not exist, creating it now');
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'User',
                friends: []
            });
            console.log('User document created successfully');
        } else {
            console.log('User document already exists');
        }
    }
}
