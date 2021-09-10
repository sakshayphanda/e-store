import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import { FirebaseOptionsToken } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from 'sp-notifications';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// lazy loading
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: 'src/app/admin/admin.module#AdminModule'
  },
    {
    path: '',
    loadChildren: 'src/app/shopping/shopping.module#ShoppingModule'
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    NotificationModule,
    SharedModule,
    CoreModule,
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
