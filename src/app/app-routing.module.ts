import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ContactoComponent } from './Components/contacto/contacto.component';
import { ProductosComponent } from './Components/productos/productos.component';

const routes: Routes = [
  { path: 'Inicio', component: InicioComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'Productos', component: ProductosComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
