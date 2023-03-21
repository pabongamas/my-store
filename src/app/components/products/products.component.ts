import { Component, OnInit } from '@angular/core';
import { Product,CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { StoreService } from '../../services/store.service';

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
  showProductDetail=false;
  productChosen:Product={
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
  limit=10;
  offset=0;
  statusDetail:'loading'|'success'|'error'|'init'='init';
  today= new Date();
  date =new Date(2021,1,21)
  constructor(
    private storeService:StoreService,
    private ProductsService:ProductsService
  ) { 
    this.myShoppingCart=this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // este es para obtener todos los productos
    // this.ProductsService.getAllProducts()
    // este es para obtener paginado los registros 
  /*   this.ProductsService.getAllProductsByPage(5,0)
    .subscribe(data=>{
      this.products=data;
      this.offset+=this.limit;
    }); */
    this.loadMore();
  }
  onAddToShoppingCart(product:Product){
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product)
    this.total=this.storeService.getTotal();
    // this.total=this.myShoppingCart.reduce((sum,item)=>sum+item.price,0);
  }
  toggleProductDetail(){
    this.showProductDetail=!this.showProductDetail;
  }
  onShowDetail(id:string){
    this.statusDetail='loading';
    this.toggleProductDetail();
    this.ProductsService.getProduct(id).subscribe(data=>{
    
      this.productChosen=data;
      this.statusDetail='success';
    },errorMsg=>{
      window.alert(errorMsg);
      this.statusDetail='error';
    })
  }

  createNewProduct(){
    const product:CreateProductDTO={
      title:'Nuevo producto',
      description:' bla bla',
      images:[`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price:1000,
      categoryId:2
    };
    this.ProductsService.create(product)
    .subscribe(data=>{
      console.log('created',data);
      this.products.unshift(data);
    });
  }
  updateNewProduct(){
    const changes:UpdateProductDTO={
       title:'change title',
    }
    const id=this.productChosen.id;
    this.ProductsService.update(id,changes)
    .subscribe(data=>{
      const productIndexFInd=this.products.findIndex(item=>item.id===this.productChosen.id);
      this.products[productIndexFInd]=data;
      this.productChosen=data;
    });
  }
  deleteProduct(){
    const id=this.productChosen.id
    this.ProductsService.delete(id)
    .subscribe(data=>{
      const productIndexFInd=this.products.findIndex(item=>item.id===this.productChosen.id);
      this.products.splice(productIndexFInd,1);
      this.showProductDetail=false;
    });

  }
  loadMore(){
    this.ProductsService.getAllProducts(this.limit,this.offset)
    .subscribe(data=>{
      this.products=this.products.concat(data); 
      this.offset+=this.limit;
    });
  }
}

