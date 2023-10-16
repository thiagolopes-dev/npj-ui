import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroAgendamentoComponent } from './cadastro-agendamento/cadastro-agendamento.component';
import { ListaAgendamentosComponent } from './lista-agendamentos/lista-agendamentos.component';


const routes: Routes = [
  {
    path: '',
    component: ListaAgendamentosComponent,
  },
  {
    path: 'novo',
    component: CadastroAgendamentoComponent,
  },
  {
    path: ':id',
    component: CadastroAgendamentoComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosRoutingModule {}