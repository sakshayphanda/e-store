import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../service/shopping-cart.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { Observable } from 'rxjs';
import { SidebarActions } from 'src/app/data/sidebarActions.data';
import { IUserData } from 'src/app/model/IUserData';
import { IProductsInCart } from 'src/app/model/IProductsInCart';
import { Roles } from 'src/app/enums/Roles';

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
