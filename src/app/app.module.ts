import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { FirebaseOptionsToken } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from 'sp-notifications';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';


// lazy loading
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule'
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NotificationModule,
    SharedModule,
    AdminModule,
    CoreModule,
    ShoppingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
  { provide: FirebaseOptionsToken, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
