import { AdminAuthGuardService } from './../service/admin-auth-guard.service';
import { AuthServiceService } from './../service/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
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

  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private adminAuthGuardService: AdminAuthGuardService,
    private activatedRoute: ActivatedRoute,
    private globalData: GlobalDataService,
    private cartService: ShoppingCartService) { }

  ngOnInit() {
    let wid = window.innerWidth;
    if(wid < 900) {
      this.showMenuButton = true;
    } else {
      this.showMenuButton = false;
    }
    window.addEventListener('resize', (event) => {
      const width = event['currentTarget']['innerWidth'];

      if(width < 900) {
        this.showMenuButton = true;
      } else {
        this.showMenuButton = false;
        this.globalData.toggleMenu.emit('show');
      }
    });
    this.user$ = this.auth.userData;
    console.log(this.user$, 'Current user information');

    if(localStorage.getItem('cartId')) {
    this.cartService.getCartProducts(localStorage.getItem('cartId')).valueChanges().subscribe(
      product => {

        this.cartService.totalCost = 0;
        this.products = product;
        if(!this.products.length) {
          this.totalCost = 0;
          return;
        }
        this.products.forEach(
          pro => {
            console.log('price', pro.price);
            this.cartService.totalCost = this.cartService.totalCost + pro.price;

            this.totalCost = this.cartService.totalCost;

          }
       );
      }
    );
    }

    this.user$.subscribe(
      userInfo => {

        console.log(userInfo, 'Current user information');

        if (userInfo) {
          this.auth.appUser.subscribe( // checking if the logged in user has isLogged in key as true(ie he is an admin)
            user => {
              if (user.isAdmin) {
                this.adminAuthGuardService.adminEmail.emit(true);
              }
            }
          );
        }
      }
    );
    this.adminAuthGuardService.adminEmail.subscribe(
      state => {
        console.log(state);
        this.isAdminAccount = state;
      }
    );

    if (this.user$) { // if there is a logged in user take him to the dynamic component
      this.router.navigate([''], {
        relativeTo: this.activatedRoute
      });
    }
  }

  logOut() {
    this.auth.logOut(); // logging out of the application
    window.location.reload(); // reloading the webpage when the logout is clicked
  }

  toggleSideMenu() {
    this.globalData.toggleMenu.emit(true);
  }

}
