import { CategoryService } from './service/category.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { GlobalDataService } from './service/global-data.service';
import { AuthServiceService } from './service/auth-service.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { UserService } from './service/user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

import { FormsModule} from '@angular/forms';
import { ProductService } from './service/product.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Build on top of web animations api

const routes: Routes = [
  {
    path: '',
    component: DynamicComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    canActivate: [AuthGuardService]

  },
  {
    path: 'admin/admin-orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/admin-products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
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
    SideNavigationComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule

  ],
  providers: [
    AuthServiceService,
    GlobalDataService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
