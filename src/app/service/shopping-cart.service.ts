import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productsInCart = {
    totalCost: 0,
    length: 0,
    productDetails: []
  };
  constructor(private db: AngularFireDatabase) {
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
  }

  getCartProducts() {
    const uid = localStorage.getItem('userId');
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
       this.productsInCart['totalCost'] = totalCost;
       this.productsInCart['length'] = products.length;
       this.productsInCart['productDetails'] = productDetails;
      }
    );
    }
  }

  removeItem(productKey) {
    const uid = localStorage.getItem('userId');
    this.db.object('/shopping-cart/' + uid + '/items/' + productKey).remove();
  }

  dispose() {

  }

}
