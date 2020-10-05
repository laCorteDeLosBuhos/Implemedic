import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  constructor(private router:Router) { }
  productos:any=[
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
    {producto:"Tubo al vacío plástico",imagen:"./assets/img/fondo2.png",codigo:"016085756",cantidad:"2"},
  ]
  ngOnInit(): void {
  }
  inventario(){
    this.router.navigate(['Inventario']);
  }
  pedidos(){
    this.router.navigate(['Pedidos']);
  }
  reportes(){
    this.router.navigate(['Reportes']);
  }
}
