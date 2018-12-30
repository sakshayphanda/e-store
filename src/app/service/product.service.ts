import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productKeyValue = {};

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
    return this.db.list('/products');
  }

  getProduct(id: string) {
    return this.db.object('/products/' + id);
  }
}
