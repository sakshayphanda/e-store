import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { AuthServiceService } from '../service/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  productsInCart = {};
  userData = {};
  selectedAction = 'Home';
  actions = [];

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthServiceService
    ) {
   }

  ngOnInit() {
    this.productsInCart = this.cartService.productsInCart;
    this.userData = this.authService.userData;
    this.initialiseActions();
  }

  initialiseActions() {
    this.actions = [
      {
        name: 'Home',
        route: '/home',
        auth: 'no'
      }, {
        name: 'Cart',
        route: '/cart',
        auth: 'no'
      }, {
        name: 'Checkout',
        route: '/check-out',
        auth: 'no'
      }, {
        name: 'My Orders',
        route: '/my-orders',
        auth: 'no'
      }, {
        name: 'Admin Orders',
        route: '/admin/admin-orders',
        auth: 'admin'
      }, {
        name: 'Admin Products',
        route: '/admin/admin-products',
        auth: 'admin'
      }
    ];
  }

  actionChanged($event, name) {
    $event.stopPropagation();
    this.selectedAction = name;
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }

}
