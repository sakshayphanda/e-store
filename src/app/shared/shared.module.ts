import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from './services/auth-service.service';
import { GlobalDataService } from './services/global-data.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  providers: [
    AuthServiceService,
    GlobalDataService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
  ],
  imports: [
    CommonModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ]
})
export class SharedModule { }
