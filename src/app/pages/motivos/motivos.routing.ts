import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { CadastroMotivoComponent } from './cadastro-motivo/cadastro-motivo.component';
import { ListaMotivosComponent } from './lista-motivos/lista-motivos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaMotivosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['motivos']}
  },
  {
    path: 'novo',
    component: CadastroMotivoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['motivos']}
  },
  {
    path: ':id',
    component: CadastroMotivoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['motivos']}
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotivosRoutingModule {}
