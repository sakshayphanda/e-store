import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productsData = {};
  objectKeys = Object.keys;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.productService.getProducts().subscribe(
     data => {
        this.productsData = data;
     }
   );

  }

  loadProductsData() {
    this.productsData = this.productService.productsData;
    console.log(this.productsData);


  }
  delete(itemKey) {
    this.productService.delete(itemKey);
  }

  ngOnDestroy() {
  }
}
