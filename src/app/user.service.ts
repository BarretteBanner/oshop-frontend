import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private database: AngularFireDatabase) {}

  save(user: firebase.User) {
    this.database.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
}
