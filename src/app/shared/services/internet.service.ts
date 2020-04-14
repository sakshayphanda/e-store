import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class InternetService {

  constructor(
    private notificationsService: NotificationsService
  ) {}

  checkInternetConnectivity() {
    if (navigator.onLine) {
      const conn = window.navigator['connection'];
      if (conn) {
        this.slowConnectionCheck(conn);
      }
    } else {
      this.notificationsService.toShow.push('offline');
    }
    window.addEventListener('offline', event => {
      if (this.notificationsService.toShow.includes('online')) {
        const index = this.notificationsService.toShow.indexOf('online');
        this.notificationsService.toShow.splice(index, 1);
      }
      if (!this.notificationsService.toShow.includes('offline')) {
      this.notificationsService.toShow.push('offline');
      }
    });
    window.addEventListener('online', event => {
      if (this.notificationsService.toShow.includes('offline')) {
        const index = this.notificationsService.toShow.indexOf('offline');
        this.notificationsService.toShow.splice(index, 1);
      }
      if (!this.notificationsService.toShow.includes('online')) {
      this.notificationsService.toShow.push('online');
      }


      const conn = window.navigator['connection'];
      if (conn) {
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
      if (!this.notificationsService.toShow.includes('slow')) {
        this.notificationsService.toShow.push('slow');
      }
    } else {
      if (this.notificationsService.toShow.includes('slow')) {
        const index = this.notificationsService.toShow.indexOf('slow');
        this.notificationsService.toShow.splice(index, 1);
      }
    }
  }
}
