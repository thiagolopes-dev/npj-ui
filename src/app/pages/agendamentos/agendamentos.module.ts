import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { CadastroAgendamentoComponent } from './cadastro-agendamento/cadastro-agendamento.component';
import { ListaAgendamentosComponent } from './lista-agendamentos/lista-agendamentos.component';
import { AgendamentosRoutingModule } from './agendamentos.routing';

@NgModule({
  declarations: [CadastroAgendamentoComponent, ListaAgendamentosComponent],
  imports: [PrimeNGModule, SharedModule, FormsModule, AgendamentosRoutingModule],
})
export class AgendamentosModule {}