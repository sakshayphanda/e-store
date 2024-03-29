import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { IProductsInCart } from 'src/app/shared/models/interfaces/IProductsInCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  productsInCart: IProductsInCart;
  constructor(
    private cartService: ShoppingCartService
    ) { }

  ngOnInit() {
    this.productsInCart = this.cartService.productsInCart;
  }
  removeItem(productKey: string) {
    this.cartService.removeItem(productKey);
  }

}
