import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/shoppingCart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private database: AngularFireDatabase) {}

  private create() {
    return this.database.list('/shopping-carts').push({
      data: new Date().getTime()
    });
  }

  getCart(): Observable<ShoppingCart> {
    let cartId = this.getOrCreateCartId();
    return this.database
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((cart: any) => new ShoppingCart(cart.items)));
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.database.object(
      '/shopping-carts/' + cartId + '/items/' + productId
    );
  }

  addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = this.getOrCreateCartId();
    let selectedItem = this.getItem(cartId, product.id);
    selectedItem
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        selectedItem.update({
          product: product,
          quantity:
            (item.payload.val() ? item.payload.val().quantity : 0) + change
        });
      });
  }
}
