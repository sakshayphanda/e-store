import { OrderService } from '../../../../service/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { IProductsInCart } from 'src/app/model/IProductsInCart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {
  cartItems: IProductsInCart;
  message: string;
  constructor(
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.productsInCart;
  }

  addOrderToDb(formValue) {
    this.orderService.createOrder(formValue, this.cartItems).then(
      () => {
        this.message = 'Successfully ordered';
      }
    );
  }

}
