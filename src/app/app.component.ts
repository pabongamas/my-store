import { Component,OnInit } from '@angular/core';

/* import { Product } from './product.model'; */
  import{AuthService} from './services/auth.service';
import{UsersService} from './services/users.service';
import{FilesService} from './services/files.service';
import{TokenService} from './services/token.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  imgParent='';
  showImg=true;
  token='';
  imgRta='';

  constructor(
    private AuthService:AuthService,
    private UsersService:UsersService,
    private FilesService:FilesService,
    private TokenService:TokenService
  ){

  }

  widthImg=10;
  name = 'Jhon';
  age=26;
  img='https://source.unsplash.com/random';
  disabled=true;
  register={
    name:'',
    email:'',
    password:''
  }
  person={
    name:'Nombre 2',
    age:18,
    avatar:'https://source.unsplash.com/random'
  }
  names :string[]=['jhon','carlos','manuel'];
  newName='';
  box={
      width:100,
      height:100,
      background:'red'
  }
  ngOnInit(){
    const token=this.TokenService.getToken();
    if(token){
      this.AuthService.profile()
      .subscribe()
    }
  }
  

  toggleButton(){
      this.disabled=!this.disabled;
  }
  increaseAge(){
    this.person.age+=1;
  }
  onScroll(event:Event){
    const element=event.target as HTMLElement;
    console.log(element.scrollTop);
  }
  changeName(event:Event){
    const element=event.target as HTMLInputElement;
    this.person.name=element.value;
  }
  addName(){
    this.names.push(this.newName);
    this.newName='';
  }
  deleteName(index:number){
    this.names.splice(index,1);
  }
  onRegister(){
    console.log(this.register);
  }
  onLoaded(img: string){
    console.log('log padre',img);
  }
  toggleImg(){
    this.showImg=!this.showImg;
  }

  createUser(){
    this.UsersService.create({
      name:'jhoncito',
      email:'jhoncito@gmail.com',
      password:'123456789',
      role:'customer'
    })
    .subscribe(rta=>{
      console.log(rta);
    });
  }
  downloadPdf(){
    this.FilesService.getFile('my.pdf','https://damp-spire-59848.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }
  onUpload(event:Event){
    const element=event.target as HTMLInputElement;
    const file=element.files?.item(0);
    if(file){
      this.FilesService.uploadFile(file)
      .subscribe(rta=>{
        this.imgRta=rta.location;
      })
    }
   
  }
  
}
