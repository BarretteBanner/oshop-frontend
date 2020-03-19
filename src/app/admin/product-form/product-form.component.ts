import { Component } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable, Subscription, of } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable: Observable<[Category]>;
  productObservable: Observable<Product>;
  id: string;
  subscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categoriesObservable = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productObservable = this.productService.get(this.id);
    else this.productObservable = of({}) as Observable<Product>;
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
