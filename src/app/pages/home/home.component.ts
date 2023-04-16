import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private ProductsService:ProductsService
  ) { }
  products:Product[]=[];
  limit=10;
  offset=0;

  ngOnInit(): void {
    this.ProductsService.getAllProducts(this.limit,this.offset)
    .subscribe(data=>{
      this.products=this.products.concat(data); 
      this.offset+=this.limit;
    });
  }
  loadMore(): void {
    this.ProductsService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }

}
