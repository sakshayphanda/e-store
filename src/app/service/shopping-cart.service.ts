import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  totalCost = 0;
  noOfProducts = 0;
  constructor(private db: AngularFireDatabase) { }


  createShoppingCart() {
    return this.db.list('/shopping-cart').push( // returns the key of the added cart
      {
        dateCreated : new Date().getDate()
      }
    );
  }

  addProductsToCart(cartid, product) {
    this.db.object('/shopping-cart/' + cartid + '/items/' + product.title + new Date().getTime()).update(product);
  }

  getCartProducts(Uid) {
    return this.db.list('/shopping-cart/' + Uid + '/items/');
  }

  removeItem(cartId,productKey) {
    this.db.object('/shopping-cart/' + cartId + '/items/' + productKey).remove();
  }

}
