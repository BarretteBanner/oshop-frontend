import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnDestroy {
  productsObservable: Product[] = [];
  filteredProducts: Product[];
  productSubscription: Subscription;
  constructor(productService: ProductService) {
    this.productSubscription = productService
      .getAll()
      .subscribe(
        products => (this.filteredProducts = this.productsObservable = products)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.productsObservable.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.productsObservable;
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }
}
