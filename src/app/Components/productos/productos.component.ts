import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  p: number = 1;
  productoss: any;
  searchTerm: any="";
  info: any;
  productos: any;
  cantidad: any;
  constructor(public ngxSmartModalService: NgxSmartModalService,private service:ServcioService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getProducts().toPromise().then(result=>{
      this.productoss=JSON.parse(JSON.stringify(result))
      this.productos=JSON.parse(JSON.stringify(result))
      this.spinner.hide();
    })
    if(!sessionStorage.getItem("Productos")){
      sessionStorage.setItem("Productos","[]")
    }
  }
  todos(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(1)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos;
  }
  kenxin(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(2)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "kenxin");
  }
  laboratorio(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(3)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "laboratorio");
  }
  quirurgico(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(4)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "quirurgico");
  }
  instrumental(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(5)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "instrumental");
  }
  muebles(){
    document.querySelector(".linneas").querySelectorAll(".col-2").forEach(fun=>{
      fun.classList.remove("active")
    })
    document.querySelector(".linneas").querySelectorAll(".col-2:nth-child(6)").forEach(fun=>{
      fun.classList.add("active")
    })
    this.productoss=this.productos.filter(res=>res.marca.toLowerCase() == "muebles");
  }
  search(): void {
    let term = this.searchTerm;
    this.productoss= this.productos.filter(function(tag) {
        return tag.titulo.contains(term) >= 0;
    }); 
}
edit(row){
  this.info=row;
  setTimeout(a=>{
    this.ngxSmartModalService.getModal('myModal').open()
    this.ngxSmartModalService.setModalData(row,'myModal');
    console.log(this.ngxSmartModalService.getModalData('myModal'))
  },100)
}
add(a){
  this.info=null;
  this.cantidad=null;
  console.log(a);
  let product=JSON.parse(sessionStorage.getItem("Productos"))
  let added = {
    "cantidad":a,
    "producto":this.ngxSmartModalService.getModalData('myModal')
  }
  product.push(added);
  sessionStorage.setItem("Productos",JSON.stringify(product));
}
filter(a){
  this.productoss=this.productos.filter(res=>res.nombre.toLowerCase().includes(a.toLowerCase()));
}
}
