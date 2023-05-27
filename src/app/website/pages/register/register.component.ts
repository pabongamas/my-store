import { Component, OnInit } from '@angular/core';

import {OnExit} from "./../../../guards/exit.guard"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  OnExit(){
    const rta=confirm("Logica desde componente y estas seguro de salir ");
    return rta;
  }
}
