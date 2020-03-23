import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../models/user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shoppingCart';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  userObservable: Observable<User>;
  cartObservable: Observable<ShoppingCart>;
  subscription: Subscription;
  shoppingCartItemCount: number;
  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userObservable = this.authService.userObservable;

    this.cartObservable = this.shoppingCartService.getCart();
    // this.subscription = this.shoppingCartService.getCart().subscribe(cart => {
    //   this.shoppingCartItemCount = 0;
    //   for (let productId in cart.items)
    //     this.shoppingCartItemCount += cart.items[productId].quantity;
    // });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
