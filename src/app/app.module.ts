import { GlobalDataService } from './service/global-data.service';
import { AuthServiceService } from './service/auth-service.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { LoginComponent } from './login/login.component';
import { DynamicComponent } from './home/dynamic/dynamic.component';
import { HomeComponent} from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductsComponent } from './home/dynamic/products/products.component';
import { ShoppingCartComponent } from './home/dynamic/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './home/dynamic/check-out/check-out.component';
import { OrderSuccessComponent } from './home/dynamic/order-success/order-success.component';
import { MyOrdersComponent } from './home/dynamic/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './service/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: DynamicComponent
  },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'Shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent
  },
  {
    path: 'admin-orders',
    component: AdminOrdersComponent
  },
  {
    path: 'admin-products',
    component: AdminProductsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent,
    TopNavigationComponent,
    LoginComponent,
    DynamicComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    SideNavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()

  ],
  providers: [
    AuthServiceService,
    GlobalDataService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
