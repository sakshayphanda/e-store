import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// saving and getting the user data to the firebase database
  constructor(private fireDatabase: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.fireDatabase.object('/userDetails/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(userId): Observable<any> {
    return this.fireDatabase.object('/userDetails/'  + userId).valueChanges();
  }
}
