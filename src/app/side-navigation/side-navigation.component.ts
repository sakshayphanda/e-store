import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  itemsInCart;
  cartId: string;
  constructor(private cartService: ShoppingCartService) {
   }

  ngOnInit() {
    this.cartId = localStorage.getItem('cartId');
    this.cartService.getCartProducts(this.cartId).snapshotChanges().subscribe(
      product => {
        console.log('product', product);
        this.cartService.totalCost = 0;
        this.cartService.noOfProducts = product.length;
        this.itemsInCart = this.cartService.noOfProducts;
      }
    );
  }
}
