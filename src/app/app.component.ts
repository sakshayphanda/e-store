import { AuthServiceService } from './service/auth-service.service';
import { Component, OnDestroy } from '@angular/core';
import { fade } from './animations/fade';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ fade ]
})
export class AppComponent implements OnDestroy {
  userData = {};
  constructor(
    private authService: AuthServiceService,
    private productService: ProductService) {

    this.userData = this.authService.userData;
    this.authService.authenticateUser();
    this.productService.getProducts();
  }

  ngOnDestroy() {
    this.authService.dispose();
  }
}
