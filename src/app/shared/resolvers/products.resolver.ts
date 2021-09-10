import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, shareReplay, skip, take } from "rxjs/operators";
import { delay } from "rxjs/operators";
import { ProductService } from "../services/product.service";

@Injectable()
export class productsResolver implements Resolve<any> {
  constructor(private products: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.products.getProducts().pipe(take(1));
  }
}
