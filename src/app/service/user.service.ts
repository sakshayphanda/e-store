import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  createUser() {
  }

  readUserData(userId): Observable<any> {
    return this.angularFireDatabase.object('/userDetails/'  + userId).valueChanges();
  }

  updateUser(user: firebase.User) {
    this.angularFireDatabase.object('/userDetails/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  deleteUser() {
  }
}
