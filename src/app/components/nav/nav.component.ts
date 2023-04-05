import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service'
import{AuthService} from '../../services/auth.service';
import{User} from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  activeMenu=false;
  counter=0;
  token='';
  profile:User | null=null;
  constructor(
    private storeService:StoreService,
    private AuthService:AuthService,
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter=products.length;
    });
  }
  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }
  login(){
    this.AuthService.loginAndGet('jhoncito@gmail.com','123456789')
    .subscribe(user=>{
      this.profile=user;
    });
  }
  getProfile(){
    this.AuthService.profile()
    .subscribe(profile=>{
      console.log(profile);
      this.profile=profile;
    });
  }

}
