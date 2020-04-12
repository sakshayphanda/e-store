// to check whether the logged in user is an admin or not
import { CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Roles } from '../enums/Roles';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private authService: AuthServiceService) { }
  canActivate(): boolean {
    return this.authService.userData.role === Roles.ADMIN ? true : false;
  }
}
