// to check whether the logged in user is an admin or not
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { AuthServiceService } from "../../shared/services/auth-service.service";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/switchMap";
import { Roles } from "../../shared/enums/Roles";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuardService implements CanActivate, CanLoad {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[] // can access parameters and path
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    return new BehaviorSubject(
      this.authService.userData.role === Roles.ADMIN ||
        this.router.parseUrl("/") // to go to a particular URL
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    return new BehaviorSubject(
      this.authService.userData.role === Roles.ADMIN ||
        this.router.parseUrl("/") // to go to a particular URL
    );
  }
}
