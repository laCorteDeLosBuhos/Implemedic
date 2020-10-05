import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  productos:any=[
  ]
  constructor(private router:Router,private data:DataService,private active:ActivatedRoute) { }
  inf:any;
  ngOnInit(): void {
    this.data.getData()
    this.inf=this.data.shared;
    this.productos=this.inf.productos;
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
