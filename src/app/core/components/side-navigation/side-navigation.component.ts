import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AuthServiceService } from '../../../shared/services/auth-service.service';
import { Observable } from 'rxjs';
import { SidebarActions } from 'src/app/shared/data/sidebarActions.data';
import { IUserData } from 'src/app/shared/models/interfaces/IUserData';
import { IProductsInCart } from 'src/app/shared/models/interfaces/IProductsInCart';
import { Roles } from 'src/app/shared/enums/Roles';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  productsInCart: IProductsInCart;
  userData: IUserData;
  selectedAction = 'Home';
  actions = SidebarActions;
  roles = Roles;

  constructor(
    private cartService: ShoppingCartService,
    private authService: AuthServiceService
    ) {
   }

  ngOnInit() {
    this.productsInCart = this.cartService.productsInCart;
    this.userData = this.authService.userData;
  }

  actionChanged($event, name) {
    $event.stopPropagation();
    this.selectedAction = name;
  }

  logOut() {
    this.authService.logOut();
    window.location.reload();
  }

}
