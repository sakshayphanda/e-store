import { OrderService } from './../../../service/order.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {

  items;
  cartItems = {};
  message = '';
  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
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
