import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObservable: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute
  ) {
    this.userObservable = angularFireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
