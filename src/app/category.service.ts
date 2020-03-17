import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private database: AngularFireDatabase) {}

  getCategories() {
    return this.database
      .list('/categories', ref => ref.orderByChild('name'))
      .valueChanges();
  }
}
