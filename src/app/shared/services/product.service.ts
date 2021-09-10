import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { EventEmitter, Injectable } from "@angular/core";
import { IProductDetails } from "../../shared/models/interfaces/IProductDetails";
import { ICategories } from "./category.service";
import { BehaviorSubject, Observable } from "rxjs";

export interface IProducts {
  products: Object;
  categories: ICategories[];
  unFilteredProducts: IProductDetails[];
}
@Injectable({
  providedIn: "root",
})
export class ProductService {
  productsData = {
    products: {},
    categories: [],
    unFilteredProducts: [],
  };

  constructor(private db: AngularFireDatabase) {}

  create(product) {
    this.db.list("/products").push(product);
  }

  update(product, id) {
    this.db.object("/products/" + id).update(product);
  }

  delete(id) {
    this.db.object("/products/" + id).remove();
  }
  getProducts(): Observable<any> {
    const productsData$ = new EventEmitter<any>();
    this.getCategories();
    this.db
      .list("/products")
      .snapshotChanges()
      .subscribe((products) => {
        // used snapshotChanges instead of ValueCHanges just to get the key of the object
        this.productsData.products = {};
        this.productsData.unFilteredProducts = [];

        products.forEach((product) => {
          this.productsData.products[product.key] = product.payload.val();
          this.productsData.unFilteredProducts.push(
            product.payload.val() as IProductDetails
          );
        });

        productsData$.emit(this.productsData);
      });
    return productsData$;
  }

  getCategories() {
    this.db
      .list<ICategories>("/categories", (ref) => ref.orderByChild("name"))
      .valueChanges()
      .subscribe((categories) => {
        this.productsData.categories = categories;
      });
  }

  getProduct(id: string): AngularFireObject<IProductDetails> {
    return this.db.object("/products/" + id);
  }
}
