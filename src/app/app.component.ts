import { AuthServiceService } from './service/auth-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fade } from './animations/fade';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ fade ]
})
export class AppComponent implements OnInit, OnDestroy {
  userData = {};
  toShow = ['online', 'offline'];
  notificationsObj = {
    offline: {
      icon: 'fas fa-exclamation-circle',
      style: {
        background: '#ec5656'
      },
      message: 'No internet',
      buttons: [
      ]
    },
    online: {
      icon: 'fas fa-wifi',
      style: {
        background: '#71b971'
      },
      message: 'Internet is now connected',
      buttons: [{
        id: 'reload',
        name: 'Reload'
      }
      ]
    },
    slow: {
      style: {
        background: '#6565e8'
      },
      message: 'Slow Network detected. You may experience delay in response',
      buttons: []
    }
  };
  constructor(
    private authService: AuthServiceService,
    private productService: ProductService) {

    this.userData = this.authService.userData;
    this.authService.authenticateUser();
    this.productService.getProducts();
  }

  ngOnInit() {
    this.internetConnectivity();
  }

  btnClicked(id, $event) {
    if($event === 'reload') {
      window.location.reload();
    }
  }

  internetConnectivity() {
    if (navigator.onLine) {
      const conn = window.navigator['connection'];
      if (conn) {
        // save data mode is enabled, so dont preload
        // if (conn.saveData) {
        // }
        this.slowConnectionCheck(conn);
      }
    } else {
      this.toShow.push('offline');
    }
    window.addEventListener('offline', event => {
      if (this.toShow.includes('online')) {
        const index = this.toShow.indexOf('online');
        this.toShow.splice(index, 1);
      }
      if (!this.toShow.includes('offline')) {
      this.toShow.push('offline');
      }
    });
    window.addEventListener('online', event => {
      if (this.toShow.includes('offline')) {
        const index = this.toShow.indexOf('offline');
        this.toShow.splice(index, 1);
      }
      if (!this.toShow.includes('online')) {
      this.toShow.push('online');
      }


      const conn = window.navigator['connection'];
      if (conn) {
        // save data mode is enabled, so dont preload
        // if (conn.saveData) {
        // }
        this.slowConnectionCheck(conn);
      }
    });

      navigator['connection'].addEventListener('change', () => {
        if (navigator.onLine) {
          const conn = window.navigator['connection'];
          this.slowConnectionCheck(conn);
        }
      });
  }

  slowConnectionCheck(conn) {
    const avoidTheseConnections = ['slow-2g', '2g' /*, '3g', '4g' */];
    const effectiveType = conn.effectiveType || '';
    if (avoidTheseConnections.includes(effectiveType)) {
      if (!this.toShow.includes('slow')) {
        this.toShow.push('slow');
      }
    } else {
      if (this.toShow.includes('slow')) {
        const index = this.toShow.indexOf('slow');
        this.toShow.splice(index, 1);
      }
    }
  }

  closed(id, n) {
      console.log('closed');
      this.toShow.splice(n, 1);
  }

  ngOnDestroy() {
    this.authService.dispose();
  }
}
