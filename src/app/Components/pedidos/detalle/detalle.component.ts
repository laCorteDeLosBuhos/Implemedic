import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{
  productos:any=[
  ]
  constructor(private router:Router,private data:DataService,private active:ActivatedRoute,private service:ServcioService) { }
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
  guardar(){
    this.service.savePedido(this.inf).toPromise().then(result=>{
      this.router.navigate(['Pedidos']);
    })
  }
  disminuir(comen){
    comen.cantidad=comen.cantidad-1;
    if(comen.cantidad==0){
      this.inf.productos=this.inf.productos.filter(function(el) { return el.producto.codigo !== comen.producto.codigo; }); 
      this.productos=this.productos.filter(function(el) { return el.producto.codigo !== comen.producto.codigo; }); 
    }
  }
  add(comen){
    comen.cantidad=comen.cantidad+1;
  }
  csesion(){
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['Inicio'])
        sessionStorage.clear();
      } 
    })
  }
}
