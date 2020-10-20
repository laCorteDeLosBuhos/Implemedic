import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {
  info: any;
  dataImagen: any;
  imgSeleccionada: any;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  columns = [{ name:'codigo',prop: 'Codigo' },{name:'Nombre',prop:'nombre'}, { name: 'Marca',prop: 'marca' }, { name: 'Descripcion', prop: 'descripcion' }, { name: 'Linea', prop: 'linea' }, { name: 'Imagen', prop: 'urlImg'  ,  sortable: false}, { name: 'Edit' ,  sortable: false}];
  constructor(public ngxSmartModalService: NgxSmartModalService,private router:Router,private service:ServcioService) { }
  productos:any=[]
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

  ngOnInit(): void {
    this.service.getInventarios().toPromise().then(result=>{
      this.productos=JSON.parse(JSON.stringify(result))
    })
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
  subir(a){
    for (var i = 0; i < a.target.files.length; i++) {
      /* -- obtener archivo --*/
      this.dataImagen = a.target.files[i];
    /* convertir img en bit y visualizar en la vista*/
      if ((this.dataImagen.name.split('.').pop() == "csv")) {
        const reader = new FileReader();
        // tslint:disable-next-line:no-shadowed-variable
        reader.onload = (event: any) => {
          const localUrl = event.target.result;
          this.imgSeleccionada = null;
          this.imgSeleccionada = localUrl;
            this.service.setInventarios({"nombre": this.dataImagen.name, "base64": this.imgSeleccionada.split(",")[1] }).toPromise().then(result => {
              this.service.getInventarios().toPromise().then(res=>{
                Swal.fire('Inventarios Subidos', '', 'success');
                $("#archivo").val("");
                this.productos=JSON.parse(JSON.stringify(res))
              })
            }).catch(ees=>{
              Swal.fire('Ha ocurrido un error', '', 'error')
            });;
        };
        reader.readAsDataURL(a.target.files[0]);
      }
      else {
        Swal.fire('Ha ocurrido un error', 'Recuerda que debe ser un archivo csv el cual tenga el codigo del producto y la cantidad', 'error')
      }
    }
  }
}
