import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { AuthServiceService } from '../service/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  itemsInCart;
  cartId: string;
  user$: Observable<firebase.User>;

  constructor(private cartService: ShoppingCartService,
    private auth: AuthServiceService
    ) {
   }

  ngOnInit() {
    this.user$ = this.auth.userData;
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

  logOut() {
    this.auth.logOut(); // logging out of the application
    window.location.reload(); // reloading the webpage when the logout is clicked
  }

}
