import { Component, OnInit } from '@angular/core';
import { Sesion } from 'src/app/models/sesion';
import { ProductoService } from 'src/app/services/producto.service';
import { TokenService } from 'src/app/services/token.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

	sesiones: Sesion[] = [];

  constructor(private productoService: ProductoService, 
              private tokenService: TokenService, 
              private router: Router) {
              this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.cargarSesiones();
      }
    });
   }

  ngOnInit() {
  this.cargarSesiones();
  }

  cargarSesiones(): void {
  const id = Number(this.tokenService.getId());
    this.productoService.sesion(id).subscribe(data => {
      this.sesiones = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }


}
