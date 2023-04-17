import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private ProductsService:ProductsService,
    private route:ActivatedRoute
  ) { }
  products:Product[]=[];
  limit=10;
  offset=0;
  productId:string |null=null;

  ngOnInit(): void {
    this.ProductsService.getAllProducts(this.limit,this.offset)
    .subscribe(data=>{
      this.products=this.products.concat(data); 
      this.offset+=this.limit;
    });
    this.route.queryParamMap.subscribe(params=>{
      this.productId=params.get('product');
      console.log(this.productId);
    })
  }
  loadMore(): void {
    this.ProductsService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }

}
