import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  // to check whether the user is logged in or not
  constructor(private auth: AuthServiceService, private router: Router) { }


  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.userData.map(
      user => {
        if (user) { return true; } // if user is logged in than show this component
          this.router.navigate(['/login'],{ queryParams: {returnUrl: state.url}});
          return false; // otherwise take him to the login page.
      }
    );
  }
}
