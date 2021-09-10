import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, shareReplay, take } from "rxjs/operators";
import { delay } from "rxjs/operators";
import { AuthServiceService } from "../services/auth-service.service";
import { ProductService } from "../services/product.service";

@Injectable()
export class userInfoResolver implements Resolve<any> {
  constructor(    private authService: AuthServiceService,
    ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.authService.authenticateUser()
    .pipe(take(1))
    // return of(100).pipe(delay(2000))
  }
}
