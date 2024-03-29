import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { retry,catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import {
  CreateProductDTO,
  UpdateProductDTO,
  Product,
} from './../models/product.model';
import {checkTime} from './../interceptors/time.interceptor'

import { environment } from './../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.API_URL+'/api';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?:number, offset?:number) {
    /*  return this.http.get<Product[]>(this.apiUrl); */
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl+"/products",{params,context:checkTime()})
    /* esto es para reintenar por si una peticion falla ,el 3 es el numero de veces que reintenta , se requier
    importar el retry */
    // el map se utilizo para ranformar la peticion con datos que retorna el backend 
    .pipe(
      retry(3),
      map(products=>products.map(item=>{
        return { ...item,taxes:.19*item.price}
      }))
    );
  
  }
  getAllProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl+"/products", {
      params: { limit, offset },
    });
  }

  getBycategory(categoryId:string,limit?:number, offset?:number){
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params=params.set('limit',limit);
      params=params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl+"/categories/"+categoryId+"/products",{params})
  }


  getProduct(id: string) {
    return this.http.get<Product>(this.apiUrl + '/products/' + id)
    .pipe(catchError((error:HttpErrorResponse)=>{
      if(error.status===HttpStatusCode.Conflict){
        return throwError('algo esta fallando en el server');
      }
      if(error.status===HttpStatusCode.NotFound){
        return throwError('El producto no existe');
      }
      if(error.status===HttpStatusCode.Unauthorized){
        return throwError('No estas autorizado');
      }
      return throwError('ups algo salio mal');
    })
    );
  }
  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl+"/products", data);
  }
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(this.apiUrl + '/products/' + id, dto);
  }
  delete(id: string) {
    return this.http.delete<boolean>(this.apiUrl + '/products/' + id);
  }
}
