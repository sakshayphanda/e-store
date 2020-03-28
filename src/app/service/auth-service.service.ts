import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart
} from '@angular/router';
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
    private route: ActivatedRoute
  ) {}

  user: Observable<firebase.User> = this.angularFireAuth.authState;
  observablesToUnsubscribe = [];
  userData = {
    loading: false
  };
  login() {
    this.angularFireAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logOut() {
    localStorage.clear();
    this.angularFireAuth.auth.signOut();
  }

  authenticateUser() {
    this.userData['loading'] = true;
    const $userData = this.user.subscribe(user => {
      if (user) {
        this.userService.updateUser(user);
        localStorage.setItem('userId', user.uid);
        this.userData['isLoggedIn'] = true;
        this.userData['userid'] = user.uid;
        this.userData['userDetails'] = user.providerData[0];
        this.userRole(user.uid);
        this.cartService.getCartProducts();
        this.userData['loading'] = false;
        this.redirectToReturnUrl();
      } else {
        this.cartService.getCartProducts();
        this.userData['isLoggedIn'] = false;
        this.userData['loading'] = false;
        this.redirectToReturnUrl();
      }
    });

    this.observablesToUnsubscribe.push($userData);
  }

  userRole(uid) {
    this.angularFireDatabase
      .object('/roles/' + uid)
      .valueChanges()
      .subscribe(userRole => {
        this.userData['role'] = userRole;
        this.redirectToReturnUrl();
      });
  }

  redirectToReturnUrl() {
    if (localStorage.getItem('returnUrl')) {
      const route = localStorage.getItem('returnUrl').split('?')[0];
      this.router.navigate([route ? route : '']);
    } else {
      this.router.navigate(['home']);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event['urlAfterRedirects'];
        if (route !== null && route !== '/login') {
          localStorage.setItem('returnUrl', route);
        }
      }
    });
  }

  dispose() {
    this.observablesToUnsubscribe.forEach(observable => {
      observable.unsubscribe();
    });
  }
}
