import { CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
// to check whether the logged in user is an admin or not
  adminEmail;
  constructor(private authService: AuthServiceService) { }


  canActivate(): Observable<boolean> {
    return this.authService.appUser
    .map(
        appUser => appUser.isAdmin // returning the observable of boolean (isAdmin state) of the logged in user.
    );
  }
}
