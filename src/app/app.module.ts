import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { TopNavigationComponent } from './core/components/top-navigation/top-navigation.component';
import { LoginComponent } from './core/components/login/login.component';
import { DynamicComponent } from './core/components/home/dynamic/dynamic.component';
import { HomeComponent} from './core/components/home/home.component';
import { AngularFireModule, FirebaseOptionsToken } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductsComponent } from './core/components/home/dynamic/products/products.component';
import { ShoppingCartComponent } from './core/components/home/dynamic/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './core/components/home/dynamic/check-out/check-out.component';
import { OrderSuccessComponent } from './core/components/home/dynamic/order-success/order-success.component';
import { MyOrdersComponent } from './core/components/home/dynamic/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { SideNavigationComponent } from './core/components/side-navigation/side-navigation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';

import { FormsModule} from '@angular/forms';
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
    NotificationModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    AdminAuthGuardService,
  { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
