import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObservable: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.userObservable = afAuth.authState;
  }

  login() {
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
