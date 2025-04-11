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
}
