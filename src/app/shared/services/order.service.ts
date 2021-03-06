import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../enums/LocalStorageKeys';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userId = localStorage.getItem(LocalStorageKeys.USER_ID);

  constructor(private db: AngularFireDatabase) { }

  createOrder(userDetails, userItems) {
      const promise = this.db.list('/orders/' + this.userId).push({userDetails, userItems});
      return promise;
  }

  readOrdersList() {
    const promise = new Promise((resolve, reject) => {
    this.db.list('/orders/' + this.userId).valueChanges().subscribe(
      response => {
        resolve(response);
      }
    );
  });
    return promise;
  }

  readAdminOrders() {
    const promise = new Promise((resolve, reject) => {
      this.db.object('/orders').valueChanges().subscribe(
        response => {
          resolve(response);
        }
      );
    });
    return promise;
  }
}
