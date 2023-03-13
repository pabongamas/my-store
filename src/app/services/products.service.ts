import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {CreateProductDTO,UpdateProductDTO, Product} from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl="https://young-sands-07814.herokuapp.com/api/products";

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(){
    // return this.http.get<Product[]>('https://fakestoreapi.com/products');
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProduct(id:string){
    return this.http.get<Product>(this.apiUrl+"/"+id);
  }

  create(data:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl,data);
  }
  update(id:string,dto:UpdateProductDTO){
    return this.http.put<Product>(this.apiUrl+"/"+id,dto);
  }
  delete(id:string){
    return this.http.delete<boolean>(this.apiUrl+"/"+id);
  }
}
