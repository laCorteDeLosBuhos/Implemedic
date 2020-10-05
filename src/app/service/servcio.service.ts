import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServcioService {
  baseUrl="https://backimplemedica.herokuapp.com/api/";
  private httpOptions={headers:new HttpHeaders({"Content-Type":"application/json"})};
  constructor(private http:HttpClient) { }

  signin(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"auth/signin",datos,this.httpOptions)
  }
  signup(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"auth/signup",datos,this.httpOptions)
  }
  getProducts():Observable<any>{
    return this.http.get(this.baseUrl+"product/getAll",this.httpOptions)
  }
  getCiudades():Observable<any>{
    return this.http.get(this.baseUrl+"ciudad/getAll",this.httpOptions)
  }
  getPedidos():Observable<any>{
    return this.http.get(this.baseUrl+"pedidos/getAll",this.httpOptions)
  }
  newPedido(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"pedidos/newPedido",datos,this.httpOptions)
  }
}
