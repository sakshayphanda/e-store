import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute) { }

  userData: Observable<firebase.User> = this.afAuth.authState;
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('cartId');
    localStorage.removeItem('returnUrl');
  }

  get appUser(): Observable<any> {
    return this.userData.switchMap(
      user => this.userService.get(user.uid) // getting the object of the current logged in user
    );
  }
}
