import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Admin } from 'src/app/models/admin';
import { TokenService } from 'src/app/services/token.service';
//import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
admins: Admin [] = [];

  constructor(private productoService: ProductoService,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenService, 
              private router: Router) { }

  ngOnInit() {
  this.cargarAsistencia();
  }

   cargarAsistencia(): void {
 	  const id = this.activatedRoute.snapshot.params.id;
    this.productoService.admin(id).subscribe(data => {
      this.admins = data;
    },
      (err: any) => {
        console.log(err);
        this.router.navigate(['']);
      }
    );
  }

}
