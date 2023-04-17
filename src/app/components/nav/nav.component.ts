import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service'
import{AuthService} from '../../services/auth.service';
import{CategoriesService} from '../../services/categories.service';
import{User} from '../../models/user.model';
import{Category} from '../../models/category.model';


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
    private CategoriesService:CategoriesService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter=products.length;
    });
    this.getAllCategories();
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
  getAllCategories(){
    this.CategoriesService.getAll()
    .subscribe(data=>{
      this.categories=data;
    })
  }

}
