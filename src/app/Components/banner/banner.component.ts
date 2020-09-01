import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('cambiar', { static: false }) cambiar: ElementRef;
  @ViewChild('nueva', { static: false }) nuevaa: ElementRef;
  constructor(private router:Router,private modalService: NgbModal) { }
  closeResult = '';
  ngOnInit(): void {
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
