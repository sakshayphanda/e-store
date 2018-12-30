import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productsSubscription;
  productKeyValue = {};
  objectKeys = Object.keys;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadProductsData();
    // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   // localStorage.setItem();

   console.log(this.router.url);

   localStorage.setItem('returnUrl', this.router.url);

  }

  loadProductsData() {
    this.productKeyValue = {};

    this.productsSubscription = this.productService.getProducts().snapshotChanges().subscribe(
      items => { // i used snapshotChanges instead of ValueCHanges just to get the key of the object
        items.forEach(
          item => {
            this.productKeyValue[item.key] = item.payload.val();

          }
        );
      }
    );

    this.productService.productKeyValue = this.productKeyValue;

  }
  delete(itemKey) {
    this.productService.delete(itemKey);
    this.loadProductsData();

    this.productService.productKeyValue = this.productKeyValue;
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
