import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { ContactoComponent } from './Components/contacto/contacto.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BannerComponent } from './Components/banner/banner.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MiListaComponent } from './Components/mi-lista/mi-lista.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReportesComponent } from './Components/producto/producto.component';
import { DetalleComponent } from './components/pedidos/detalle/detalle.component';
import { InventariosComponent } from './components/inventarios/inventarios.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContactoComponent,
    BannerComponent,
    ProductosComponent,
    FooterComponent,
    MiListaComponent,
    ModalComponent,
    PedidosComponent,
    ReportesComponent,
    DetalleComponent,
    InventariosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    AppRoutingModule,
    NgbModule,
    NgxSmartModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
