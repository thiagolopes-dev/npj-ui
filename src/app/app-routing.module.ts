import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'motivos', component: ListaMotivosComponent },
  {
    path: 'motivos',
    loadChildren: () =>
      import('./pages/motivos/motivos.module').then((m) => m.MotivosModule),
  },
  {
    path: 'varas',
    loadChildren: () =>
      import('./pages/varas/varas.module').then((v) => v.VarasModule),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}