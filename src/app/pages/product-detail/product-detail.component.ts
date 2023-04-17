import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { switchMap } from 'rxjs';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {
  productId:string|null=null;
  product: Product |null=null;
  constructor(
    private route:ActivatedRoute,
    private ProductsService:ProductsService,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.ProductsService.getOne(
              this.productId
            );
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.product = data;
        // this.offset += this.limit;
      });
  }
  goToBack(){
    this.location.back();
  }

}
