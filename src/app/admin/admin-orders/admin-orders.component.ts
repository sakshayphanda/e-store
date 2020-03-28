import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.sass']
})
export class AdminOrdersComponent implements OnInit {
  customerOrders = {};
  showOrders = true;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.readAdminOrders().then(
      (response: Object) => {
        this.customerOrders = response;
        console.log(this.customerOrders);
        if (Object.keys(response).length) {
          this.showOrders = true;
        } else {
          this.showOrders = false;
        }
      }
    );

  }
}
