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
  productDetails = {};
  constructor(
    private authService: AuthServiceService,
    private adminService: AdminAuthGuardService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    private router: Router
    ) { }

  ngOnInit() {
    localStorage.setItem('returnUrl', '/products');
    this.user$ = this.authService.user;

    this.productDetails = this.productService.productDetails;
    this.filteredProducts = this.productDetails['unFilteredProducts'];

    this.adminService.adminEmail.subscribe(
      isAdmin => this.adminState = isAdmin
    );
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().then(
    (response) => {
      this.openCategory(this.currentCategory);
    });
  }

  openCategory(cat: string) {
    this.filteredProducts = this.productDetails['unFilteredProducts'];
    if (cat === 'All') {
      return;
    } else {
    this.filteredProducts = this.filteredProducts.filter(
      p => {
        if (cat.toLowerCase() === (p.category).toLowerCase()) {
        return true;
      }
    }
    );
  }
  }

  addToCart(product) {
    const cartId = localStorage.getItem('userId');
    if (!cartId) {
      this.cartService.createShoppingCart().then(
        cart => {
          localStorage.setItem('userId', cart.key);
          this.cartService.getCartProducts();

          this.cartService.addProductsToCart(localStorage.getItem('userId'), product);

        }
      );
    } else {
    this.cartService.addProductsToCart(cartId, product);
    }
   // this.router.navigate(['/cart'], { queryParams: { id: id }});
  }


  ngOnDestroy() {
  }
}
