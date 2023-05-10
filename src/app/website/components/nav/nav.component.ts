import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StoreService} from '../../../services/store.service'
import{AuthService} from '../../../services/auth.service';
import{CategoriesService} from '../../../services/categories.service';
import{User} from '../../../models/user.model';
import{Category} from '../../../models/category.model';


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
  categories:Category[]=[];
  constructor(
    private storeService:StoreService,
    private AuthService:AuthService,
    private CategoriesService:CategoriesService,
    private Router:Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter=products.length;
    });
    this.getAllCategories();
    this.AuthService.user$
    .subscribe(data=>{
      this.profile=data;
    })
  }
  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }
  login(){
    this.AuthService.loginAndGet('john@mail.com','changeme')
    .subscribe(()=>{
      this.Router.navigate(['/profile']);
    });
  }
  getProfile(){
    this.AuthService.profile()
    .subscribe(profile=>{
      console.log(profile);
      this.profile=profile;
    });
  }
  getAllCategories(){
    this.CategoriesService.getAll()
    .subscribe(data=>{
      this.categories=data;
    })
  }
  logout(){
    this.AuthService.logout();
    this.profile=null;
    this.Router.navigate(['/home']);

  }

}
