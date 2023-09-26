import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMotivoComponent } from './cadastro-motivo/cadastro-motivo.component';
import { ListaMotivosComponent } from './lista-motivos/lista-motivos.component';

const routes: Routes = [
  {
    path: '',
    component: ListaMotivosComponent,
  },
  {
    path: 'novo',
    component: CadastroMotivoComponent,
  },
  {
    path: ':id',
    component: CadastroMotivoComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotivosRoutingModule {}
