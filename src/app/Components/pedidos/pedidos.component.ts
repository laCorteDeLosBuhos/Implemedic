import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServcioService } from 'src/app/service/servcio.service';
import { DataService } from 'src/app/data.service'
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: string;
  usuario: any;
  rowss: any;
  constructor(private router:Router,private service:ServcioService, private data:DataService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
    this.service.getPedidos().toPromise().then(result=>{
      this.rows=result;
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
      this.rowss=this.rows;
      if(this.usuario.roles[0].name=='ROLE_USER'){
        this.rows=this.rows.filter(res=>res.correo == this.usuario.email)
      }
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
  reporte(){
    this.router.navigate(['Reporte']);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  filter(a){
    this.rows=this.rowss.filter(res=>res.nombre.toLowerCase().includes(a.toLowerCase()));
  }
}
