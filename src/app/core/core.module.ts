import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];
@NgModule({
  declarations: [
    TopNavigationComponent,
    LoginComponent,
    HomeComponent,
    SideNavigationComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HomeComponent
  ]
})
export class CoreModule { }
