import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productDetails = {};
  objectKeys = Object.keys;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
   this.loadProductsData();

  }

  loadProductsData() {
    this.productDetails = this.productService.productDetails;

  }
  delete(itemKey) {
    this.productService.delete(itemKey);
  }

  ngOnDestroy() {
  }
}
