import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categoryObservable: Observable<Category[]>;
  @Input('category') categorySelected;

  constructor(categoryService: CategoryService) {
    this.categoryObservable = categoryService.getCategories();
  }
}
