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
  edit(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"auth/edit",datos,this.httpOptions)
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
  getInventarios():Observable<any>{
    return this.http.get(this.baseUrl+"inventarios/getAll",this.httpOptions)
  }
  getUsuarios():Observable<any>{
    return this.http.get(this.baseUrl+"auth/getUsers",this.httpOptions)
  }
  setAdmin(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"auth/setAdmin",datos,this.httpOptions)
  }
  getReportes(datos:any):Observable<any>{
    return this.http.get(this.baseUrl+"reportes/getAll/"+datos,this.httpOptions)
  }
  getReportesLinea(datos:any,datas:any):Observable<any>{
    return this.http.get(this.baseUrl+"reportes/getAllMarca/"+datos+"/"+datas,this.httpOptions)
  }
  newPedido(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"pedidos/newPedido",datos,this.httpOptions)
  }
  savePedido(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"pedidos/savePedido",datos,this.httpOptions)
  }
  setProducts(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"product/setProducts",datos,this.httpOptions)
  }
  saveProducts(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"product/editar",datos,this.httpOptions)
  }
  eliminarProductos(datos:any):Observable<any>{
    return this.http.get(this.baseUrl+"product/eliminar/"+datos,this.httpOptions)
  }
  setInventarios(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"inventarios/setInventario",datos,this.httpOptions)
  }
  contacto(datos:any):Observable<any>{
    return this.http.post(this.baseUrl+"correo/getAll",datos,this.httpOptions)
  }
}
