import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productsObservable: Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected: string;
  subscription: Subscription;
  cartObservable: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService.getAll().subscribe(products => {
      this.productsObservable = products;

      route.queryParamMap.subscribe(params => {
        this.categorySelected = params.get('category');

        this.filteredProducts = this.categorySelected
          ? this.productsObservable.filter(
              product => product.category === this.categorySelected
            )
          : this.productsObservable;
      });
    });

    this.filteredProducts = this.productsObservable;
  }

  ngOnInit() {
    this.subscription = this.shoppingCartService
      .getCart()
      .subscribe(cart => (this.cartObservable = cart));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
