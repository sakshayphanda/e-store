import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {

  ordersList = [];
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.readOrdersList().then(
      (response: any []) => {
        this.ordersList = response;
      }
    );
  }

}
