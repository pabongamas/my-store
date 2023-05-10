import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import {TokenService} from './../services/token.service';
import {AuthService} from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private TokenService:TokenService,
    private Router:Router,
    private AuthService:AuthService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   const token=this.TokenService.getToken();
    //   if(!token){
    //     this.Router.navigate(['/home']);
    //     return false;
    //   }
    // return true;
    // esto por observable usando la reactividad
    return this.AuthService.user$
    .pipe(
      map(user=>{
        if(!user){
          this.Router.navigate(['/home']);
        return false;
        }
        return true;
      })
    )
  }
  
}
