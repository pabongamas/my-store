import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

import{Product} from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  @Input() product:Product={
    id:'',
    price:0,
    images:[],
    title:'',
    category:{
      id:'',
      name:'',
    },
    description:''
  };
  @Output() addedProduct=new EventEmitter<Product>();
  @Output() showProduct=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
}
