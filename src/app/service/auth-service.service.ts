import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private userService: UserService,
    private cartService: ShoppingCartService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private route: ActivatedRoute) { }

  user: Observable<firebase.User> = this.angularFireAuth.authState;
  observablesToUnsubscribe = [];
  userData = {
    loading: false
  };
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    localStorage.setItem('returnUrl', returnUrl);
    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.angularFireAuth.auth.signOut();
    localStorage.clear();
  }

  authenticateUser() {
    this.userData['loading'] = true;
    const $userData = this.user.subscribe(
      user => {
        if (user) {
          this.userService.updateUser(user);
          localStorage.setItem('userId', user.uid);
          this.userData['isLoggedIn'] = true;
          this.userData['userid'] = user.uid;
          this.userData['userDetails'] = user.providerData[0];
          this.userRole(user.uid);
          this.cartService.getCartProducts();
          this.router.navigate(['']);
          this.userData['loading'] = false;
          // this.router.navigateByUrl(localStorage.getItem('returnUrl'));
        } else {
          this.userData['isLoggedIn'] = false;
          this.userData['loading'] = false;

        }

      }
    );

    this.observablesToUnsubscribe.push($userData);
  }

  userRole(uid) {
    this.angularFireDatabase.object('/roles/' + uid).valueChanges().subscribe(
      userRole => {
        this.userData['role'] = userRole;
      }
    );
  }


  dispose() {
    this.observablesToUnsubscribe.forEach(
      observable => {
        observable.unsubscribe();
      }
    );
  }
}
