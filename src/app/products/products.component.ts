import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  productsObservable: Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected: string;

  constructor(route: ActivatedRoute, productService: ProductService) {
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
}
