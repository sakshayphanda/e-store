import { AuthServiceService } from './../service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { GlobalDataService } from '../service/global-data.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {
  user$: Observable<firebase.User>;
  isAdminAccount = false;
  products = [];
  totalCost = 0;
  showMenuButton = false;
  productsInCart = {};
  userData = {};

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

    if (this.userData['isLoggedIn']) {
      this.router.navigate([''], {
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
      const width = event['currentTarget']['innerWidth'];

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
