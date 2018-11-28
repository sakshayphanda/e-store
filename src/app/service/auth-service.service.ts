import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private afAuth: AngularFireAuth) { }

  userData = this.afAuth.authState;
  login() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.userData = undefined;
  }
}
