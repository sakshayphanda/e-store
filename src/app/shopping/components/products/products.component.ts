import { ActivatedRoute } from "@angular/router";
import { AuthServiceService } from "../../../shared/services/auth-service.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  ProductService,
  IProducts,
} from "src/app/shared/services/product.service";
import { ShoppingCartService } from "src/app/shared/services/shopping-cart.service";
import { IUserData } from "src/app/shared/models/interfaces/IUserData";
import { Routes } from "src/app/shared/enums/Routes";
import { Roles } from "src/app/shared/enums/Roles";
import { LocalStorageKeys } from "src/app/shared/enums/LocalStorageKeys";
import { IProductDetails } from "src/app/shared/models/interfaces/IProductDetails";
import { map } from "rxjs/operators";
import { ALL_CATEGORIES } from "src/app/shared/constants/global.constants";
import { ResolverConstants } from "src/app/shared/constants/resolver.constants";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.sass"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  userDetails: IUserData;
  filteredProducts: IProductDetails[] = [];
  productsData: IProducts;
  Routes = Routes;
  Roles = Roles;
  ALL_CATEGORIES = ALL_CATEGORIES;
  currentCategory = ALL_CATEGORIES;
  constructor(
    private authService: AuthServiceService,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userDetails = this.authService.userData;
    this.activatedRoute.data
      .pipe(map((data) => data[ResolverConstants.products]))
      .subscribe((response) => {
        this.productsData = response;
        this.filteredProducts = this.productsData.unFilteredProducts;
        this.openCategory(ALL_CATEGORIES);
      });
  }

  openCategory(category) {
    const params = this.activatedRoute.snapshot.queryParams;
    this.filteredProducts = this.productsData.unFilteredProducts;
    if (category === ALL_CATEGORIES) {
      return;
    } else {
      this.filteredProducts = this.filteredProducts.filter((p) => {
        if (category.toLowerCase() === p.category.toLowerCase()) {
          return true;
        }
      });
    }
  }

  addToCart(product) {
    const cartId = localStorage.getItem(LocalStorageKeys.USER_ID);
    if (!cartId) {
      this.cartService.createShoppingCart().then((cart) => {
        localStorage.setItem(LocalStorageKeys.USER_ID, cart.key);
        this.cartService.getCartProducts();

        this.cartService.addProductsToCart(
          localStorage.getItem(LocalStorageKeys.USER_ID),
          product
        );
      });
    } else {
      this.cartService.addProductsToCart(cartId, product);
    }
  }

  ngOnDestroy() {}
}
