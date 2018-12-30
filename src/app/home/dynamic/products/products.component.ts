import { CategoryService } from './../../../service/category.service';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from './../../../service/admin-auth-guard.service';
import { AuthServiceService } from './../../../service/auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  user$;
  adminState;
  products$;
  productKeyValue;
  productsSubscription;
  categories = [];
  filteredProducts = [];
  unFilteredProducts = [];
  objectKeys = Object.keys;
  currentCategory = 'All';
  constructor(
    private authService: AuthServiceService,
    private adminService: AdminAuthGuardService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private router: Router
    ) { }

  ngOnInit() {
   // localStorage.setItem('returnUrl', this.router.url);
    console.log(this.currentCategory,'init called');
    this.user$ = this.authService.userData;

    this.categoryService.getCategories().valueChanges().subscribe(
      categories => {
        console.log(categories,'categories');
        this.categories = categories;
      }
    );

    this.adminService.adminEmail.subscribe(
      isAdmin => this.adminState = isAdmin
    );

    this.loadProductsData();
  }

  openCategory(cat: string) {
    console.log('cat',cat);
    this.filteredProducts = this.unFilteredProducts;
    if (cat === 'All') {
      this.filteredProducts = this.unFilteredProducts;

    } else {
    this.filteredProducts = this.filteredProducts.filter(
      p => {
        if (cat.toLowerCase() === (p.category).toLowerCase()) {
        return true;
      }
    }
    );
  }
    console.log(this.filteredProducts, 'filtered Products');
  }
  loadProductsData() {
    this.productKeyValue = {};

    this.productsSubscription = this.productService.getProducts().snapshotChanges().subscribe(
      items => { // i used snapshotChanges instead of ValueCHanges just to get the key of the object
        items.forEach(
          item => {
            this.productKeyValue[item.key] = item.payload.val();
            console.log(this.productKeyValue);

            this.unFilteredProducts.push(item.payload.val());
            console.log(this.unFilteredProducts, 'filtered Products');

            this.filteredProducts = this.unFilteredProducts;

          }
        );
      }
    );

    this.productService.productKeyValue = this.productKeyValue;

  }

  addToCart(product) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.cartService.createShoppingCart().then(
        cart => {
          localStorage.setItem('cartId', cart.key);
          this.cartService.addProductsToCart(localStorage.getItem('cartId'), product);

        }
      );
    } else {
    this.cartService.addProductsToCart(cartId, product);
    }
   // this.router.navigate(['/cart'], { queryParams: { id: id }});
  }


  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
