import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.sass']
})
export class CheckOutComponent implements OnInit {

  constructor(
    private cartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.setItem('returnUrl', this.router.url);

  }

}
