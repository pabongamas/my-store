import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import {
  CreateProductDTO,
  UpdateProductDTO,
  Product,
} from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?:number, offset?:number) {
    /*  return this.http.get<Product[]>(this.apiUrl); */
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{params})
    /* esto es para reintenar por si una peticion falla ,el 3 es el numero de veces que reintenta , se requier
    importar el retry */
   /*  .pipe(
      retry(3)
    ); */
  }
  getAllProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset },
    });
  }
  getProduct(id: string) {
    return this.http.get<Product>(this.apiUrl + '/' + id);
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(this.apiUrl + '/' + id, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + '/' + id);
  }
}
