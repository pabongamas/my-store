import { Component, OnInit } from '@angular/core';

import {AuthService} from './../../../services/auth.service';
import {User} from './../../../models/user.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user:User | null =null;
  constructor(
    private AuthService:AuthService
  ) { }

  ngOnInit(): void {
    // this.AuthService.profile()
    // .subscribe(data=>{
    //   this.user=data;
    // })
    this.AuthService.user$
    .subscribe(data=>{
      this.user=data;
    })
  }

}
