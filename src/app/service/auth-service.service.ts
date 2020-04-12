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
import { IUserData } from '../model/IUserData';
import { defaultUserData } from '../data/defaultUserData';
import { LocalStorageKeys } from '../enums/LocalStorageKeys';
import { Routes } from '../enums/Routes';

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
  userData: IUserData = defaultUserData;
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
    this.userData.loading = true;
    const $userData = this.user.subscribe(async user => {
      if (user) {
        this.userData.loading = true;
        this.userService.updateUser(user);
        localStorage.setItem(LocalStorageKeys.USER_ID, user.uid);
        this.userData.isLoggedIn = true;
        this.userData.uid = user.uid;
        this.userData.userDetails = user.providerData[0];
        await this.userRole(user.uid);
        this.cartService.getCartProducts();
        this.userData.loading = false;
        this.redirectToReturnUrl();
      } else {
        this.cartService.getCartProducts();
        this.userData.isLoggedIn = false;
        this.userData.loading = false;
        this.redirectToReturnUrl();
      }
    });

    this.observablesToUnsubscribe.push($userData);
  }

  userRole(uid): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
    this.angularFireDatabase
      .object('/roles/' + uid)
      .valueChanges()
      .subscribe((userRole: string) => {
        this.userData.role = userRole;
        this.redirectToReturnUrl();
        resolve(true);
      });
    });

    return promise;
  }

  redirectToReturnUrl() {
    if (localStorage.getItem(LocalStorageKeys.RETURN_URL)) {
      const route = localStorage.getItem(LocalStorageKeys.RETURN_URL).split('?')[0];
      this.router.navigate([route ? route : '']);
    } else {
      this.router.navigate([Routes.HOME]);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const route = event.urlAfterRedirects;
        if (route !== null && route !== Routes.LOGIN) {
          localStorage.setItem(LocalStorageKeys.RETURN_URL, route);
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
