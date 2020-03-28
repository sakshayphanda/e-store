import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  productsInCart = {};
  constructor(private cartService: ShoppingCartService,
    private router: Router) { }

  ngOnInit() {
    this.productsInCart = this.cartService.productsInCart;
  }
  removeItem(productKey) {
    this.cartService.removeItem(productKey);
  }

}
