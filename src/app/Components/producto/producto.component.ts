import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ServcioService } from 'src/app/service/servcio.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ReportesComponent implements OnInit {
  info: any;

  constructor(public ngxSmartModalService: NgxSmartModalService,private router:Router,private service:ServcioService) { }
  productos:any=[
    {codigo:"016085756",nombre:"Tubo al vacío plástico",marca:"kenxin",descripcion:"Tubo al vacío plástico marca Kenxin",categoria:"linea kenxin"},
  ]
  ngOnInit(): void {
    this.service.getProducts().toPromise().then(result=>{
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
  edit(row){
    this.info=row;
    setTimeout(a=>{
      this.ngxSmartModalService.getModal('myModal').open()
      this.ngxSmartModalService.setModalData(row,'myModal');
      console.log(this.ngxSmartModalService.getModalData('myModal'))
    },100)
  }
}
