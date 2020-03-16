import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseUserObservable: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.firebaseUserObservable = angularFireAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.signOut();
  }

  get userObservable(): Observable<User> {
    return this.firebaseUserObservable.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
