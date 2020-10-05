import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from '../../service/servcio.service'
declare const $: any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('cambiar', { static: false }) cambiar: ElementRef;
  @ViewChild('nueva', { static: false }) nuevaa: ElementRef;
  constructor(private router:Router,private modalService: NgbModal, private data:ServcioService,private spinner:NgxSpinnerService) { }
  closeResult = '';
  constrase="";
  user="";
  ngOnInit(): void {
  }
  MiLista(){
    this.router.navigate(['MiLista'])
  }
  Contacto(){
    this.router.navigate(['Contacto'])
  }
  productos(){
    this.router.navigate(['Productos'])
  }
  inicio(){
    this.router.navigate(['Inicio'])
  }
  show:any=sessionStorage.getItem('Token')==null;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  iniciar(){
    this.spinner.show();
    var datos={"username":this.user,"password":this.constrase}
    console.log(datos);
    this.data.signin(datos).toPromise().then(result=>{
      console.log(result);
      this.spinner.hide();
      $("#exampleModal").modal("hide");
      this.show=true;
      sessionStorage.setItem("Token",result.accessToken);
      this.router.navigate(['Pedidos'])
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
  
}
