import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ErrorHandler } from '@angular/core'
import { FileOpener } from '@ionic-native/file-opener/ngx';


import { IonicModule } from '@ionic/angular';

import { NuevoProductoPage } from './nuevo-producto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuevoProductoPage],
  providers:[
  FileOpener,
  {provide: ErrorHandler, useClass: IonicModule},
  ]
})
export class NuevoProductoPageModule {}
