import { CategoryService } from './service/category.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { GlobalDataService } from './service/global-data.service';
import { AuthServiceService } from './service/auth-service.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { LoginComponent } from './components/login/login.component';
import { DynamicComponent } from './components/home/dynamic/dynamic.component';
import { HomeComponent} from './components/home/home.component';
import { AngularFireModule, FirebaseOptionsToken } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductsComponent } from './components/home/dynamic/products/products.component';
import { ShoppingCartComponent } from './components/home/dynamic/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/home/dynamic/check-out/check-out.component';
import { OrderSuccessComponent } from './components/home/dynamic/order-success/order-success.component';
import { MyOrdersComponent } from './components/home/dynamic/my-orders/my-orders.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './service/auth-guard.service';
import { UserService } from './service/user.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';

import { FormsModule} from '@angular/forms';
import { ProductService } from './service/product.service';
import { ShoppingCartService } from './service/shopping-cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from 'sp-notifications';

const routes: Routes = [
  {
    path: '',
    component: DynamicComponent
  },
  {
    path: 'home',
    component: DynamicComponent
  },
  {
    path: 'home',
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
    RouterModule.forRoot(routes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    NotificationModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AuthServiceService,
    GlobalDataService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
  { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
