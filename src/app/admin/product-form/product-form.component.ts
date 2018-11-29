import { CategoryService } from './../../service/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit , OnDestroy{
  categories;
  categoryList;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {

    this.categories = this.categoryService.getCategories().valueChanges().subscribe(
      value => {
        this.categoryList = value;
      }
    );
  }

  save(formValue) {
    this.productService.create(formValue);
    this.router.navigate(['/admin/admin-products']);
  }

  ngOnDestroy() {
    this.categories.unsubscribe();
  }

}
