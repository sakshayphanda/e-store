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

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthServiceService
    ) {
   }

  ngOnInit() {
    this.productsInCart = this.cartService.productsInCart;
    this.userData = this.authService.userData;
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }

}
