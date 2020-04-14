import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, IProducts } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { IUserData } from 'src/app/shared/models/interfaces/IUserData';
import { Routes } from 'src/app/shared/enums/Routes';
import { Roles } from 'src/app/shared/enums/Roles';
import { LocalStorageKeys } from 'src/app/shared/enums/LocalStorageKeys';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  userDetails: IUserData;
  filteredProducts = [];
  currentCategory = 'All';
  productsData: IProducts;
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
    this.productsData = this.productService.productsData;
    this.filteredProducts = this.productsData.unFilteredProducts;
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
    this.filteredProducts = this.productsData.unFilteredProducts;
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
