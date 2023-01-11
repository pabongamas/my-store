import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {StoreService} from '../../services/store.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  myShoppingCart:Product[]=[];
  total=0;
  products:Product[]=[
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros xd',
      price: 23,
      image: './assets/images/books.jpg'
    },
  ];
  constructor(
    private storeService:StoreService
  ) { 
    this.myShoppingCart=this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }
  onAddToShoppingCart(product:Product){
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product)
    this.total=this.storeService.getTotal();
    // this.total=this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }

}
