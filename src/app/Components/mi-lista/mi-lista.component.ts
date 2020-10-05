import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-lista',
  templateUrl: './mi-lista.component.html',
  styleUrls: ['./mi-lista.component.css']
})
export class MiListaComponent implements OnInit {
  comentarios:any;
  name="";
  tipo="";
  identif="";
  user="";
  direccion="";
  telefono="";
  Cuidad="";
  form:FormGroup;
  ciudades: any;
  constructor(private router:Router, private service:ServcioService, private Spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.comentarios=JSON.parse(sessionStorage.getItem("Productos"))
    this.form = new FormGroup({
      name:new FormControl('',[Validators.required]),
      tipo:new FormControl('',[Validators.required]),
      identif:new FormControl('',[Validators.required]),
      user:new FormControl('',[Validators.required]),
      direccion:new FormControl('',[Validators.required]),
      telefono:new FormControl('',[Validators.required]),
      Cuidad:new FormControl('',[Validators.required]),
      Comentario:new FormControl('',[])
    })
    this.Spinner.show();
    this.service.getCiudades().toPromise().then(res=>{
      this.ciudades=res;
      this.Spinner.hide();
    })
  }
  pedidos(){
    if(this.form.valid){
      this.Spinner.show();
      let datos={
        "nombre":this.form.get("name").value,
        "fecha":new Date().toJSON(),
        "tipoDoc":this.form.get("tipo").value,
        "numDoc":this.form.get("identif").value,
        "correo":this.form.get("user").value,
        "direccion":this.form.get("direccion").value,
        "telefono":this.form.get("telefono").value,
        "ciudad":this.Cuidad,
        "observaciones":this.form.get("Comentario").value,
        "estado":"Pendiente",
        "productos":JSON.parse(sessionStorage.getItem("Productos"))
      }
      console.log(datos)
      this.service.newPedido(datos).toPromise().then(res=>{
        this.Spinner.hide();
        Swal.fire(
          'Felicidades',
          'Hemos comenzado la solicitud de tu pedido, nos contactaremos contigo para validar contigo',
          'success'
        )
      })
    }else{
      this.form.markAllAsTouched()
    }
  }
}
