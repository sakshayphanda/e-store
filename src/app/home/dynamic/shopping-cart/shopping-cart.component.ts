import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  products = [];
  cartId;

  constructor(private cartService: ShoppingCartService,
    private router: Router) { }

  ngOnInit() {
    this.cartId = localStorage.getItem('cartId');
    localStorage.setItem('returnUrl', this.router.url);

    this.cartService.getCartProducts(this.cartId).snapshotChanges().subscribe(
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
  removeItem(productKey) {
    this.cartService.removeItem(this.cartId, productKey.key);
  }

}
