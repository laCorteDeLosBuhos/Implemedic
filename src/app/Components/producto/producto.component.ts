import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-reportes',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  info: any;
  dataImagen: any;
  imgSeleccionada: any;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  productoss: any;
  constructor(public ngxSmartModalService: NgxSmartModalService,private router:Router,private service:ServcioService,private spinner:NgxSpinnerService) { }
  productos:any=[
    {codigo:"016085756",nombre:"Tubo al vacío plástico",marca:"kenxin",descripcion:"Tubo al vacío plástico marca Kenxin",categoria:"linea kenxin",urlImg:""},
  ]
  ngOnInit(): void {
    this.spinner.show();
    this.service.getProducts().toPromise().then(result=>{
      this.spinner.hide();
      this.productos=JSON.parse(JSON.stringify(result))
      this.productoss=this.productos;
    }).catch(call=>{
      this.spinner.hide();
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
  edit(row){
    this.info=row;
    setTimeout(a=>{
      this.ngxSmartModalService.getModal('myModal').open()
      this.ngxSmartModalService.setModalData(row,'myModal');
      console.log(this.ngxSmartModalService.getModalData('myModal'))
    },100)
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
          this.spinner.show();
            this.service.setProducts({"nombre": this.dataImagen.name, "base64": this.imgSeleccionada.split(",")[1] }).toPromise().then(result => {
              Swal.fire('Productos Subidos', '', 'success');
              $("#archivo").val("")
              this.productos=result;
              this.spinner.hide();
            }).catch(ees=>{
              Swal.fire('Ha ocurrido un error', '', 'error')
            });;
        };
        reader.readAsDataURL(a.target.files[0]);
      }
      else {
        Swal.fire('Ha ocurrido un error', 'Recuerda que debe ser un archivo csv el cual tenga el nombre, codigo, marca, descripcion, linea y url de la Imagen', 'error')
      }
    }
  }
  editar(){
    let datos=this.ngxSmartModalService.getModalData("myModal");
    if(datos.destacado){
      datos.destacado=1;
    }else{
      datos.destacado=0;
    }if(datos.promocion){
      datos.promocion=1;
    }else{
      datos.promocion=0;
    }
    this.service.saveProducts(datos).toPromise().then(res=>{
      this.info=null;
      this.ngxSmartModalService.resetModalData('myModal');
    })
  }
  salir(){
    this.ngxSmartModalService.resetModalData('myModal');
  }
  eliminar(a){
    Swal.fire({
      title: 'Deseas eliminar este producto',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarProductos(a).toPromise().then(resultado=>{
          Swal.fire({
            title: resultado
          })
        }).catch(error=>{
          Swal.fire({
            title: error.error.text
          })
        })
      } 
    })
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
  filter(a){
    this.productos=this.productoss.filter(res=>res.nombre.toLowerCase().includes(a.toLowerCase()));
  }
}
