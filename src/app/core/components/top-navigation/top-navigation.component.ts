import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { GlobalDataService } from '../../../shared/services/global-data.service';
import { Routes } from '../../../shared/enums/Routes';
import { IUserData } from 'src/app/shared/models/interfaces/IUserData';
import { IProductsInCart } from 'src/app/shared/models/interfaces/IProductsInCart';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {
  showMenuButton = false;
  productsInCart: IProductsInCart;
  userData: IUserData;
  Routes = Routes;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalData: GlobalDataService,
    private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.mobileResponsiveness();
    this.productsInCart =  this.cartService.productsInCart;
    this.userData = this.authService.userData;

    if (this.userData.isLoggedIn) {
      this.router.navigate([Routes.DEFAULT], {
        relativeTo: this.activatedRoute
      });
    }
  }

  mobileResponsiveness() {
    if (window.innerWidth < 900) {
      this.showMenuButton = true;
    } else {
      this.showMenuButton = false;
    }
    window.addEventListener('resize', (event) => {
      const width = event.currentTarget['innerWidth'];

      if (width < 900) {
        this.showMenuButton = true;
      } else {
        this.showMenuButton = false;
        this.globalData.toggleMenu.emit('show');
      }
    });
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }

  toggleSideMenu() {
    this.globalData.toggleMenu.emit(true);
  }

}
