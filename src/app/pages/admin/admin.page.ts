import { Component, OnInit } from '@angular/core';
import { Maestro } from 'src/app/models/maestro';
import { ProductoService } from 'src/app/services/producto.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
maestros: Maestro[] = [];

  constructor(private productoService: ProductoService, 
              private router: Router) { }

  ngOnInit() {
  this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.productoService.maestros().subscribe(data => {
      this.maestros = data;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
