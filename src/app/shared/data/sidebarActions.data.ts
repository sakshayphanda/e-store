import { Routes } from '../enums/Routes';
import { Roles } from '../enums/Roles';

export const SidebarActions  = [
  {
    name: 'Home',
    route: Routes.HOME,
    auth: Roles.NONE
  }, {
    name: 'Cart',
    route: Routes.CART,
    auth: Roles.NONE
  }, {
    name: 'Checkout',
    route: Routes.CHECK_OUT,
    auth: Roles.NONE
  }, {
    name: 'My Orders',
    route: Routes.MY_ORDERS,
    auth: Roles.NONE
  }, {
    name: 'Admin Orders',
    route: Routes.ADMIN_ORDERS,
    auth: Roles.ADMIN
  }, {
    name: 'Admin Products',
    route: Routes.ADMIN_PRODUCTS,
    auth: Roles.ADMIN
  }
];
