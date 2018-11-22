import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router'
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminProductsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
