import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ProductoService } from 'src/app/services/producto.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Pdf } from 'src/app/models/pdf';
import { Encabezado } from 'src/app/models/encabezado';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.page.html',
  styleUrls: ['./nuevo-producto.page.scss'],
})
export class NuevoProductoPage implements OnInit {
pdfs: Pdf [] = [];
encabezados: Encabezado [] = [] ;

    ngOnInit() {
    this.cargarPdf();
    this.cargarEncabezado();
  }


   constructor(
   private productoService: ProductoService, 
  private activatedRoute: ActivatedRoute,
  private toastController: ToastController,
  private alertController: AlertController,
  private router: Router
  ) {

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.cargarStatus();
      }
    });
   }

   cargarPdf(): void {
  const id = this.activatedRoute.snapshot.params.id;
    this.productoService.pdf(id).subscribe(data => {
      this.pdfs = data;
    },
      (err: any) => {
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }

   cargarEncabezado(): void {
  const id = this.activatedRoute.snapshot.params.id;
    this.productoService.encabezado(id).subscribe(data => {
      this.encabezados = data;
    },
      (err: any) => {
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }

 public generarPDF()  
  {  
    var data = document.getElementById('contenedor');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Reporte.pdf'); // Generated PDF   
    });  
  }


}
