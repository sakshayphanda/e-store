import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productDetails = {
    products: {},
    categories: [],
    unFilteredProducts: []
  };

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  update(product, id) {
    this.db.object('/products/' + id).update(product);
  }

  delete(id) {
    this.db.object('/products/' + id).remove();
  }
  getProducts() {
    const promise = new Promise((resolve, reject) => {
    this.getCategories();
    this.db.list('/products').snapshotChanges().subscribe(
      products => { // used snapshotChanges instead of ValueCHanges just to get the key of the object
        console.log(products);
        this.productDetails['products'] = [];
        this.productDetails['unFilteredProducts'] = [];
        products.forEach(
            product => {
              this.productDetails['products'][product.key] = product.payload.val();
              this.productDetails['unFilteredProducts'].push(product.payload.val());
            }
          );

          resolve();
        }
      );

    });

      return promise;
  }

  getCategories() {
    this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges().subscribe(
      categories => {
        this.productDetails['categories'] = categories;
      }
    );
  }

  getProduct(id: string) {
    return this.db.object('/products/' + id);
  }
}
