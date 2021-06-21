import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Sesion } from 'src/app/models/sesion';
import { Asistencia } from 'src/app/models/asistencia';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
})
export class ProductoDetallePage implements OnInit {

  sesion: Sesion = null;
  asistencias: Asistencia [] = [];
  form: any = {};
  creado = false;
  failProducto = false;
  mensajeFail = '';
  mensajeOK = '';

  constructor(
  private productoService: ProductoService, 
  private activatedRoute: ActivatedRoute,
  private toastController: ToastController,
  private alertController: AlertController,
  private router: Router) { }

  ngOnInit() {
    //this.cargarIds();
    //const id = this.activatedRoute.snapshot.params.id;
    //this.productoService.unasesion(id).subscribe(data => {
    //this.sesion = data;
   // this.productoService.setGrupo(data.grupo.toString());
   // this.productoService.setMateria(data.materia.toString());
    //}),
    this.cargarAsistencia();
  }

// cargarIds(): void {
// const id = this.activatedRoute.snapshot.params.id;
 //   this.productoService.unasesion(id).subscribe(data => {
      //this.sesion = data;
     // this.productoService.setGrupo(data.grupo.toString());
     // this.productoService.setMateria(data.materia.toString());
 //     this.sesion = data;
 //   },
 //     (err: any) => {
 //       console.log(err);
 //      this.router.navigate(['']);
 //     }
 //  );
 // }

 cargarAsistencia(): void {
 	const io = this.activatedRoute.snapshot.params.grupo;
  const nu = this.activatedRoute.snapshot.params.materia;
 	const as = this.activatedRoute.snapshot.params.id;
    this.productoService.asistencia(nu,io,as).subscribe(data => {
      this.asistencias = data;
    },
      (err: any) => {
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }

  onCreate(): void {
  const as = this.activatedRoute.snapshot.params.id;
    this.productoService.crearasistencia(as,this.form).subscribe(data => {
      this.creado = true;
      this.failProducto = false;
      this.mensajeOK = data.mensaje;
      //this.presentToast();
      window.location.reload();
     },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        this.creado = false;
        this.failProducto = true;
        //this.presentAlert();
      }
    );
  }

}
