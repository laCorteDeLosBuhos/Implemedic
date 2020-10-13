import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServcioService } from 'src/app/service/servcio.service';
import { DataService } from 'src/app/data.service'
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  @ViewChild('dateColumn') dateColumn: TemplateRef<any>;
  loadingIndicator = true;
  reorderable = true;
  columns = [{ name:'Pedido',prop: 'id' },{name:'Productos',prop:'productoss'}, { name: 'Cantidad',prop: 'cantidad' }, { name: 'Cliente', prop: 'nombre' }, { name: 'Fecha', prop: 'fecha' }, { name: 'Estado', prop: 'estado' }];

  ColumnMode = ColumnMode;
  constructor(private router:Router,private service:ServcioService, private data:DataService) { }

  ngOnInit(): void {
    this.service.getPedidos().toPromise().then(result=>{
      this.rows=result;
      console.log(this.rows)
      this.rows.forEach(res=>{
          var count = 0;
          var product= "";
          res.productos.forEach(products=>{
              count= count+ (products.cantidad);
              product = product+","+products.producto.nombre;
          })
          res.productoss = product;
          res.cantidad=count;
      })
    })
  }
  rows = [];
  detalle(a){
    this.data.setData(a);
    this.router.navigate(['DetallePedidos']);
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
