import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { AuthServiceService } from './service/auth-service.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  userDataSubscription;
  products;

  constructor(
    private userService: UserService,
    private auth: AuthServiceService,
    private router: Router,
    private cartService: ShoppingCartService) {
    this.userDataSubscription = this.auth.userData.subscribe(
      user => {
        if (user) {
          this.userService.save(user); // when the website is loaded we save the logged in user to the firebase database
          localStorage.setItem('cartId', user.uid);
          this.router.navigateByUrl(localStorage.getItem('returnUrl'));
          // navigating to the url we get from the local storage to the component the user is coming from
        }
      }
    );

    this.cartService.getCartProducts(localStorage.getItem('cartId')).snapshotChanges().take(1).subscribe(
      product => {
        this.products = product;
        this.cartService.totalCost = 0;
        this.cartService.noOfProducts = this.products.length;
        this.products.forEach(
          pro => {
            this.cartService.totalCost = this.cartService.totalCost + pro.payload.val().price;
          }
       );
      }
    );
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe(); // its important to unsubscribe a subscribed observabe when the component is destroyed
  }
}
