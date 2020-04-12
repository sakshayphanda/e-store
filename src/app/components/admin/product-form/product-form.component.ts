import { CategoryService } from '../../../service/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit , OnDestroy{
  categories;
  productDetails;
  categoryList;
  id;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {

    this.categories = this.categoryService.getCategories().valueChanges().subscribe(
      value => {
        this.categoryList = value;
      }
    );

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).valueChanges().take(1).subscribe(
        item => {
          this.productDetails = item;
        }
      );
    }
  }

  save(formValue) {
    this.productService.create(formValue);
    this.router.navigate(['/admin/admin-products']);
  }

  update(formValue) {
    this.productService.update(formValue, this.id);
    this.router.navigate(['/admin/admin-products']);

  }
  ngOnDestroy() {
    this.categories.unsubscribe();
  }

}
