import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, Params } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'editar/:id', loadChildren: './pages/editar-producto/editar-producto.module#EditarProductoPageModule' },
  { path: 'nuevo/:id', loadChildren: './pages/nuevo-producto/nuevo-producto.module#NuevoProductoPageModule' },
  { path: 'detalle/:id/:materia/:grupo', loadChildren: './pages/producto-detalle/producto-detalle.module#ProductoDetallePageModule' },
  { path: 'asesoria', loadChildren: './pages/asesoria/asesoria.module#AsesoriaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
