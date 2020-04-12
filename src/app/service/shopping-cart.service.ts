import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IProductsInCart } from '../model/IProductsInCart';
import { defaultProductsInCart } from '../data/defaultProductsInCart';
import { LocalStorageKeys } from '../enums/LocalStorageKeys';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productsInCart: IProductsInCart = defaultProductsInCart;
  constructor(
    private db: AngularFireDatabase,
    private notificationsService: NotificationsService
    ) {
   }


  createShoppingCart() {
    return this.db.list('/shopping-cart').push( // returns the key of the added cart
      {
        dateCreated : new Date().getDate()
      }
    );
  }

  addProductsToCart(cartid, product) {
    this.db.object('/shopping-cart/' + cartid + '/items/' + product.title + new Date().getTime()).update(product);
    this.notificationsService.toShow.push('cart');
    setTimeout(() => {
      const index = this.notificationsService.toShow.indexOf('cart');
      this.notificationsService.toShow.splice(index, 1);
    }, 2000);
  }

  getCartProducts() {
    const uid = localStorage.getItem(LocalStorageKeys.USER_ID);
    if (uid) {
    this.db.list('/shopping-cart/' + uid + '/items/').snapshotChanges().subscribe(
      products => {
        const productDetails = [];
        let totalCost = 0;
        products.forEach(
          product => {
            totalCost = totalCost + product.payload.val()['price'];
            productDetails.push({
              key: product.key,
              value: product.payload.val()
            });

          }
       );
       this.productsInCart.totalCost = totalCost;
       this.productsInCart.length = products.length;
       this.productsInCart.productDetails = productDetails;
      }
    );
    }
  }

  removeItem(productKey) {
    const uid = localStorage.getItem(LocalStorageKeys.USER_ID);
    this.db.object('/shopping-cart/' + uid + '/items/' + productKey).remove();
  }

  dispose() {

  }

}
