import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../../../service/auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { IUserData } from 'src/app/model/IUserData';
import { Routes } from 'src/app/enums/Routes';
import { Roles } from 'src/app/enums/Roles';
import { LocalStorageKeys } from 'src/app/enums/LocalStorageKeys';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  userDetails: IUserData;
  filteredProducts = [];
  currentCategory = 'All';
  productDetails = {};
  Routes = Routes;
  Roles = Roles;
  constructor(
    private authService: AuthServiceService,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userDetails = this.authService.userData;
    this.productDetails = this.productService.productDetails;
    this.filteredProducts = this.productDetails['unFilteredProducts'];
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().then(
    (response) => {
      this.openCategory(this.currentCategory);
    });
  }

  openCategory(category) {
    const params = this.activatedRoute.snapshot.queryParams;
    this.filteredProducts = this.productDetails['unFilteredProducts'];
    if (category === 'All') {
      return;
    } else {
    this.filteredProducts = this.filteredProducts.filter(
      p => {
        if (category.toLowerCase() === (p.category).toLowerCase()) {
        return true;
      }
    }
    );
  }
  }

  addToCart(product) {
    const cartId = localStorage.getItem(LocalStorageKeys.USER_ID);
    if (!cartId) {
      this.cartService.createShoppingCart().then(
        cart => {
          localStorage.setItem(LocalStorageKeys.USER_ID, cart.key);
          this.cartService.getCartProducts();

          this.cartService.addProductsToCart(localStorage.getItem(LocalStorageKeys.USER_ID), product);

        }
      );
    } else {
    this.cartService.addProductsToCart(cartId, product);
    }
  }


  ngOnDestroy() {
  }
}
