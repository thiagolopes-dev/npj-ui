import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProcessosComponent } from './lista-processos/lista-processos.component';
import { CadastroProcessoComponent } from './cadastro-processo/cadastro-processo.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListaProcessosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['processos']}
  },
  {
    path: 'novo',
    component: CadastroProcessoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['processos']}
  },
  {
    path: ':id',
    component: CadastroProcessoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['processos']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessoRoutingModule {}
