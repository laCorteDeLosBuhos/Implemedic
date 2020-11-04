import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  form: FormGroup;

  constructor(private router:Router,private modalService: NgbModal, private service:ServcioService) { }
  closeResult = '';
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      correo:new FormControl('',[Validators.required]),
      telefono:new FormControl('',[Validators.required]),
      dedica:new FormControl('',[Validators.required]),
      desc:new FormControl('',[Validators.required])
    })  
  }
  enviar(){
    if(this.form.valid){
      let datos={
        "nombre": this.form.get("nombre").value,
        "correo": this.form.get("correo").value,
        "telefono": this.form.get("telefono").value,
        "dedica":this.form.get("dedica").value,
        "comentario":this.form.get("desc").value
      }
      this.service.contacto(datos).toPromise().then(res=>{
        Swal.fire('Contacto realizado!', 'Muy pronto nos contactaremos contigo', 'success');
      }).catch(reas=>{
        console.log(reas)
        if(reas.error.text=="correo enviado"){
          Swal.fire('Contacto realizado!', 'Muy pronto nos contactaremos contigo', 'success');
        }else{
          Swal.fire('Ha ocurrido un error', '', 'error');
        }
        this.form.reset();
        this.form.markAsUntouched();
      })
    }else{
      this.form.markAllAsTouched()
    }
  }
}
