import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAgendamentoComponent } from './cadastro-agendamento/cadastro-agendamento.component';
import { ListaAgendamentosComponent } from './lista-agendamentos/lista-agendamentos.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ListaAgendamentosComponent,
    canActivate: [AuthGuard],
    data: {roles: ['agendamentos']}
  },
  {
    path: 'novo',
    component: CadastroAgendamentoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['agendamentos']}
  },
  {
    path: ':id',
    component: CadastroAgendamentoComponent,
    canActivate: [AuthGuard],
    data: {roles: ['agendamentos']}
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosRoutingModule {}