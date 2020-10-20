import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as HighCharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServcioService } from 'src/app/service/servcio.service';
import Swal from 'sweetalert2';
exporting(HighCharts);
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  ano:string="2020";
  linea:string;
  constructor(private router:Router,private service:ServcioService,private spinner:NgxSpinnerService) { }
  grafica:any;
  ngOnInit(): void {
    this.spinner.show();
    this.service.getReportes(this.ano).toPromise().then(result=>{
      this.grafica=HighCharts.chart('barChart', {
        lang:{
          downloadCSV:"Descargar CSV",
          downloadJPEG:"Descargar JPEG",
          downloadPDF:"Descargar PDF",
          downloadPNG:"Descargar PNG",
          downloadSVG:"Descargar SVG",
          printChart:"Imprimir",
          viewFullscreen:"Ver en pantalla completa"
        },
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cantidad',
            align: 'high'
          },
        },
        tooltip: {
          valueSuffix: ' unidades'
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            borderRadius:5,
            pointWidth: 20
          }
        },
        colors:["#5FBA51"],
        series: [{
            type: undefined,
            name: 'Total',
            data: result
          }]
      });
      this.spinner.hide();
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
  csesion(){
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['Inicio'])
        sessionStorage.clear();
      } 
    })
  }
  anos(){
    this.spinner.show();
    this.service.getReportes(this.ano).toPromise().then(result=>{
      this.grafica=HighCharts.chart('barChart', {
        lang:{
          downloadCSV:"Descargar CSV",
          downloadJPEG:"Descargar JPEG",
          downloadPDF:"Descargar PDF",
          downloadPNG:"Descargar PNG",
          downloadSVG:"Descargar SVG",
          printChart:"Imprimir",
          viewFullscreen:"Ver en pantalla completa"
        },
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cantidad',
            align: 'high'
          },
        },
        tooltip: {
          valueSuffix: ' unidades'
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            borderRadius:5,
            pointWidth: 20
          }
        },
        colors:["#5FBA51"],
        series: [{
            type: undefined,
            name: 'Total',
            data: result
          }]
      });
      this.spinner.hide();
    })
  }
  lineas(){
    this.spinner.show();
    this.service.getReportesLinea(this.ano,this.linea).toPromise().then(result=>{
      this.grafica=HighCharts.chart('barChart', {
        lang:{
          downloadCSV:"Descargar CSV",
          downloadJPEG:"Descargar JPEG",
          downloadPDF:"Descargar PDF",
          downloadPNG:"Descargar PNG",
          downloadSVG:"Descargar SVG",
          printChart:"Imprimir",
          viewFullscreen:"Ver en pantalla completa"
        },
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          categories: ['Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'],
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Cantidad',
            align: 'high'
          },
        },
        tooltip: {
          valueSuffix: ' unidades'
        },
        plotOptions: {
          column: {
            pointPadding: 0,
            borderWidth: 0,
            borderRadius:5,
            pointWidth: 20
          }
        },
        colors:["#5FBA51"],
        series: [{
            type: undefined,
            name: 'Total',
            data: result
          }]
      });
      this.spinner.hide();
    })
  }
}
