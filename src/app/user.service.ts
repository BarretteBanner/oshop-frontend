import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import 'firebase/database';
import { User } from './models/user';
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

  get(uid: string): AngularFireObject<User> {
    return this.database.object('/users/' + uid);
  }
}
