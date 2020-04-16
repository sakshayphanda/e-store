import { NgModule } from '@angular/core';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'products/new',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin-products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuardService
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
