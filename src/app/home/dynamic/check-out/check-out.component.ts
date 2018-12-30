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
  constructor(
    private cartService: ShoppingCartService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    localStorage.setItem('returnUrl', this.router.url);
    this.cartService.getCartProducts(localStorage.getItem('cartId')).valueChanges().subscribe(
      items => {
        this.items = items;
      }
    );

  }

  addOrderToDb(formValue) {
    this.orderService.createOrder(localStorage.getItem('cartId'), formValue, this.items);
  }

}
