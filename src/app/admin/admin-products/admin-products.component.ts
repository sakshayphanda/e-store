import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit ,OnDestroy{

  products;
  productsSubscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.productsSubscription = this.productService.getProducts().valueChanges().subscribe(
      prod => {
        this.products = prod;
      }
    );
  }

ngOnDestroy() {
  this.productsSubscription.unsubscribe();
}
}
