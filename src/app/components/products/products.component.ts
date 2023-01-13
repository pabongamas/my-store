import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {StoreService} from '../../services/store.service'
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  myShoppingCart:Product[]=[];
  total=0;
  // codigo quemado para ejemplo de  data , luego se cambio por data que viene de una API conectando por medio de un servicio
  // products:Product[]=[
  //   {
  //     id: '1',
  //     name: 'EL mejor juguete',
  //     price: 565,
  //     image: './assets/images/toy.jpg'
  //   },
  //   {
  //     id: '2',
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: './assets/images/bike.jpg'
  //   },
  //   {
  //     id: '3',
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: './assets/images/album.jpg'
  //   },
  //   {
  //     id: '4',
  //     name: 'Mis libros xd',
  //     price: 23,
  //     image: './assets/images/books.jpg'
  //   },
  // ];
  products:Product[]=[];
  today= new Date();
  date =new Date(2021,1,21)
  constructor(
    private storeService:StoreService,
    private ProductsService:ProductsService
  ) { 
    this.myShoppingCart=this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.ProductsService.getAllProducts()
    .subscribe(data=>{
      this.products=data;
    });
  }
  onAddToShoppingCart(product:Product){
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product)
    this.total=this.storeService.getTotal();
    // this.total=this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }

}
