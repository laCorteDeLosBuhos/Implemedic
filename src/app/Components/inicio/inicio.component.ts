import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    AOS.init();
  }
  Contacto(){
    this.router.navigate(['Contacto'])
  }
  inicio(){
    this.router.navigate(['Inicio'])
  }

}
