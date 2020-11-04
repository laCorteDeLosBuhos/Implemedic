import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario: any;
  closeResult: string;
  actual: string;
  newPassword:any;
  constructor(private router:Router,private routera:ActivatedRoute,private modalService: NgbModal,private service:ServcioService) { }

  ngOnInit(): void {
    this.actual=this.routera.snapshot.routeConfig.path;
    this.usuario=JSON.parse(sessionStorage.getItem("Usuario"));
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
  usuarios(){
    this.router.navigate(['Usuarios']);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  guardar(){
    let datos={
      id:this.usuario.id,
      nombre:this.usuario.nombre,
      celular:this.usuario.celular,
      email:this.usuario.email,
      username:this.usuario.username,
      password:this.usuario.password
    }
    if(this.newPassword!=null && this.newPassword!=""){
      datos.password=this.newPassword
    }
    Swal.fire({
      title: '¿Deseas cambiar tu informacion de usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.edit(datos).toPromise().then(res=>{
          this.modalService.dismissAll('');
        })
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
