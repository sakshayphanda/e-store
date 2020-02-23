import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  createOrder(userDetails, userItems) {
      const userId = localStorage.getItem('userId');
      const promise = this.db.list('/orders/' + userId).push({userDetails, userItems});
      return promise;
  }
}
