import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

export interface ICategories {
  name: string;
}
@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(
    private db: AngularFireDatabase
    ) { }

  getCategories(): AngularFireList<ICategories> {
    return this.db.list('/categories', ref => ref.orderByChild('name')); // to read the item in the categories object
  }
}
