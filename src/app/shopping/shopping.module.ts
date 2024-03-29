import { NgModule } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { CoreModule } from '../core/core.module';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { userInfoResolver } from '../shared/resolvers/userInfo.resolver';
import { productsResolver } from '../shared/resolvers/products.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',

      },
      {
        path: 'home',
        component: ShoppingComponent,
        resolve: {
          products: productsResolver
        },
      },
      {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'cart',
        component: ShoppingCartComponent
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]

      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService],
      }
    ]
  },
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingComponent
  ],
  providers: [userInfoResolver, productsResolver],
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsComponent
  ]
})
export class ShoppingModule { }
