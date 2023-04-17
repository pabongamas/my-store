import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
 User,CreateUsertDTO
} from './../models/user.model';

import { environment } from './../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.API_URL+'https://damp-spire-59848.herokuapp.com/api/users';
  constructor(private http: HttpClient) { }

  create(dto:CreateUsertDTO){
    return this.http.post<User>(this.apiUrl,dto);
  }
  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }

}
