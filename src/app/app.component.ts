import { AuthServiceService } from './service/auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fade } from './animations/fade';
import { ProductService } from './service/product.service';
import { IUserData } from './model/IUserData';
import { InternetService } from './service/internet.service';
import { NotificationsService } from './service/notifications.service';
import { notificationsData } from './data/notificationsData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ fade ]
})
export class AppComponent implements OnInit, OnDestroy {
  toShow: string[];
  userData: IUserData;
  notificationsObj = notificationsData;
  constructor(
    private authService: AuthServiceService,
    private productService: ProductService,
    private internetService: InternetService,
    private notificationsService: NotificationsService
    ) {

    this.userData = this.authService.userData;
    this.authService.authenticateUser();
    this.productService.getProducts();
  }

  ngOnInit() {
    this.toShow = this.notificationsService.toShow;
    this.internetService.checkInternetConnectivity();
  }

  btnClicked(id, $event) {
    if ($event === 'reload') {
      window.location.reload();
    }
  }

  closed(id, n) {
      this.toShow.splice(n, 1);
  }

  ngOnDestroy() {
    this.authService.dispose();
  }
}
