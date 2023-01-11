import { Component } from '@angular/core';

/* import { Product } from './product.model'; */


import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  imgParent='';
  showImg=true;


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
}
