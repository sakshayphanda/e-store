import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthServiceService, private router: Router) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.userData['isLoggedIn']) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
