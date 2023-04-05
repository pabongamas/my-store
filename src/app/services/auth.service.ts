import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment'; 
import {Auth} from './../models/auth.model';
import {User} from './../models/user.model';
import {TokenService} from './../services/token.service';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL+'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(
    private http: HttpClient,
    private TokenService:TokenService
    ) { }

  login(email:string,password:string){
    return this.http.post<Auth>(this.apiUrl+"/login",{email,password})
    .pipe(
      tap(response=>this.TokenService.saveToken(response.access_token))
    );
  }
  profile(){
    // const headers=new HttpHeaders();
    // headers.set('Authorization','Bearer '+token);
    return this.http.get<User>(this.apiUrl+"/profile",{
      // headers:{
      //   Authorization:'Bearer '+token,
      //   // 'Content-type':'application/json'
      // }
    });
  }
  loginAndGet(email:string,password:string){
    return this.login(email,password)
    .pipe(
      switchMap(rta=>this.profile()),
    )
  }
}
