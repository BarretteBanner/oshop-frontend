import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { documentToDomainObject } from 'src/app/utils/firebase/firebaseUtils';
import { Observable } from 'rxjs';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private database: AngularFireDatabase) {}

  getCategories(): Observable<[Category]> {
    return this.database
      .list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(map(actions => actions.map(documentToDomainObject) as [Category]));
  }
}
