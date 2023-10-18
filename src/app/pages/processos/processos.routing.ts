import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProcessosComponent } from './lista-processos/lista-processos.component';
import { CadastroProcessoComponent } from './cadastro-processo/cadastro-processo.component';

const routes: Routes = [
  {
    path: '',
    component: ListaProcessosComponent,
  },
  {
    path: 'novo',
    component: CadastroProcessoComponent,
  },
  {
    path: ':id',
    component: CadastroProcessoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessoRoutingModule {}
