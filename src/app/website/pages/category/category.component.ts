import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { switchMap } from 'rxjs';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryId: string | null = null;
  productId:string |null=null;
  limit = 10;
  offset = 0;
  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    // de esta manera esta bien pero estaria cayendo en un callbackhell porque se esta haciendo una doble suscripcion
    // this.route.paramMap.subscribe((params) => {
    //   this.categoryId = params.get('id');
    //   if (this.categoryId) {
    //     this.ProductsService.getBycategory(
    //       this.categoryId,
    //       this.limit,
    //       this.offset
    //     )
    //     .subscribe(data=>{
    //       this.products=data;
    //     });
    //   }
    //   this.offset += this.limit;
    // });
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.ProductsService.getBycategory(
              this.categoryId,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
        this.offset += this.limit;
      });
      this.route.queryParamMap.subscribe(params=>{
        this.productId=params.get('product');
        console.log(this.productId);
      })
  }

  loadMore(): void {
    if (this.categoryId) {
      this.ProductsService.getBycategory(
        this.categoryId,
        this.limit,
        this.offset
      ).subscribe((data) => {
        this.products = this.products.concat(
          data.filter((product) => product.images.length > 0)
        );
        this.offset += this.limit;
      });
    }
  }
}
