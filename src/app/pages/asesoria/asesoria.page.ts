import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/grupo';
import { ProductoService } from 'src/app/services/producto.service';
import { Tiposasesoria } from 'src/app/models/tiposasesoria';
import { TokenService } from 'src/app/services/token.service';
import { Asesoria } from 'src/app/models/asesoria';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.page.html',
  styleUrls: ['./asesoria.page.scss'],
})
export class AsesoriaPage implements OnInit {
form: any = {};
asesoria: Asesoria;
creado = false;
grupos: Grupo[] = [];
tipos: Tiposasesoria[] = [];
id: number;
failProducto = false;
mensajeFail = '';
mensajeOK = '';


  constructor(
  private productoService: ProductoService,
  private alertController: AlertController,
  private tokenService: TokenService,
  private toastController: ToastController
  ) { }


  ngOnInit() {
  this.cargarTipos();
  this.cargarDetalle();
  }

  cargarTipos(): void {
    this.productoService.tipos().subscribe(data => {
      this.tipos = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

cargarDetalle(): void {
    const id = Number(this.tokenService.getId());
    this.productoService.detalle(id).subscribe(data => {
      this.grupos = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onCreate(): void {
    this.productoService.crear(this.form).subscribe(data => {
      this.creado = true;
      this.failProducto = false;
      this.mensajeOK = data.mensaje;
      this.presentToast();
     // window.location.reload();
    },
      (err: any) => {
        this.mensajeFail = err.error.mensaje;
        this.creado = false;
        this.failProducto = true;
        this.presentAlert();
      }
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sesion no creada',
      message: this.mensajeFail,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
    header: 'Sesion creada',
      message: this.mensajeOK,
      duration: 2000
    });
    toast.present();
  }

}
