import { OrderService } from '../../../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { IProductsInCart } from 'src/app/shared/models/interfaces/IProductsInCart';

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
