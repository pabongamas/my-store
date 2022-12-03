import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass']
})
export class ImgComponent implements OnInit {

  @Input() img: string='';
  @Output() loaded=new EventEmitter<string>();
  imageDefault='https://picsum.photos/200';
  constructor() { }

  ngOnInit(): void {
  }
  imgError(){
    this.img=this.imageDefault;
  }
  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
