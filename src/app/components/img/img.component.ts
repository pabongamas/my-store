import { Component, OnInit,Input,Output,EventEmitter,OnChanges,AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass']
})
export class ImgComponent implements OnInit,OnChanges,AfterViewInit,OnDestroy {

  img: string='';

  @Input('img')
  set changeImg(newImg:string){
    this.img=newImg;
    console.log('change just img =>',this.img)
  }
  @Input() alt: string='';
  @Output() loaded=new EventEmitter<string>();
  imageDefault='https://picsum.photos/200';
  counter=0;
  counterFn:number|undefined;

  constructor() {
    //before render
    console.log('constructor','imgValue =>',this.img);
   }

  ngOnInit(): void {
    //before render 
    //async - fetch -- este metodo solo se ejecuta una vez
    console.log('ngOnInit','imgValue =>',this.img);
    // this.counterFn=window.setInterval(()=>{
    //   this.counter+=1;
    //   console.log('run counter');
    // },1000);
  }
  imgError(){
    this.img=this.imageDefault;
  }
  imgLoaded(){
    console.log('log hijo');
    this.loaded.emit(this.img);
  }
  ngOnChanges(changes:SimpleChanges){
    //BEFORE-during RENDER
    //changes inputs -- times
    console.log('ngOnChanges','imgValue =>',this.img);
    console.log("changes",changes);
  }
  ngAfterViewInit(): void {
     //after render 
     //handler
    console.log('ngAfterViewInit');
  }
  ngOnDestroy(): void {
    //delete render
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

//   Ciclo :

// Constructor: cuando se corre una instancia
// ngOnChanges : corre antes y durante en el render, siemrpe que detecte cambios en el Input, está para eso, para detectar los cambios.
// ngOnInit: corre antes pero tiene la condicione que solo correo una vez. Ahi se corren eventos asincronos.
// ngAfcterViewInit: corre cuando los hijos de ese componentes se han renderizado.
// NgOnDestroy: Corre cuando se elimina el componente.
}
