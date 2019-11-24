import { AdminAuthGuardService } from './../service/admin-auth-guard.service';
import { AuthServiceService } from './../service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {
  user$: Observable<firebase.User>;
  isAdminAccount = false;
  products;
  totalCost = 0;

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private adminAuthGuardService: AdminAuthGuardService,
    private activatedRoute: ActivatedRoute,
    private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.user$ = this.auth.userData;
    console.log(this.user$, 'Current user information');

    if(localStorage.getItem('cartId')) {
    this.cartService.getCartProducts(localStorage.getItem('cartId')).valueChanges().subscribe(
      product => {

        this.cartService.totalCost = 0;
        this.products = product;

        console.log(product);

        this.products.forEach(
          pro => {
            console.log('price', pro.price);
            this.cartService.totalCost = this.cartService.totalCost + pro.price;

            this.totalCost = this.cartService.totalCost;

          }
       );
      }
    );
    }

    this.user$.subscribe(
      userInfo => {

        console.log(userInfo, 'Current user information');

        if (userInfo) {
          this.auth.appUser.subscribe( // checking if the logged in user has isLogged in key as true(ie he is an admin)
            user => {
              if (user.isAdmin) {
                this.adminAuthGuardService.adminEmail.emit(true);
              }
            }
          );
        }
      }
    );
    this.adminAuthGuardService.adminEmail.subscribe(
      state => {
        console.log(state);
        this.isAdminAccount = state;
      }
    );

    if (this.user$) { // if there is a logged in user take him to the dynamic component
      this.router.navigate([''], {
        relativeTo: this.activatedRoute
      });
    }
  }

  logOut() {
    this.auth.logOut(); // logging out of the application
    window.location.reload(); // reloading the webpage when the logout is clicked
  }

}
