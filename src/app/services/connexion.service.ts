import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  constructor() { }

  signIn(signinForm: FormGroup) {
    // TODO: Use EventEmitter with form value
    const auth = getAuth();
    signInWithEmailAndPassword(auth, signinForm.value.email, signinForm.value.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signUp(signupForm: FormGroup) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signupForm.value.email, signupForm.value.password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential);
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  get isSignedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(getAuth(), (user) => {
        observer.next(!!user)
      })
    })
  }



  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}