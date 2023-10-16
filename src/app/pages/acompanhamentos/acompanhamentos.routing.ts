import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaAcompanhamentosComponent } from './lista-acompanhamentos/lista-acompanhamentos.component';
import { CadastroAcompanhamentoComponent } from './cadastro-acompanhamento/cadastro-acompanhamento.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAcompanhamentosComponent,
  },
  {
    path: 'novo',
    component: CadastroAcompanhamentoComponent,
  },
  {
    path: ':id',
    component: CadastroAcompanhamentoComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcompanhamentosRoutingModule {}
