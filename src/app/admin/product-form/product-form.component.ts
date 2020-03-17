import { Component } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  categoriesObservable: Observable<any[]>;
  constructor(categoryService: CategoryService) {
    this.categoriesObservable = categoryService.getCategories();
  }
}
