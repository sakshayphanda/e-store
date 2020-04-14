import { AuthServiceService } from './shared/services/auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fade } from './shared/animations/fade';
import { ProductService } from './shared/services/product.service';
import { IUserData } from './shared/models/interfaces/IUserData';
import { InternetService } from './shared/services/internet.service';
import { NotificationsService } from './shared/services/notifications.service';
import { notificationsData } from './shared/data/notificationsData';

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
