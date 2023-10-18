import { NgModule } from '@angular/core';

import { PrimeNGModule } from 'src/app/primeng.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { ProcessoRoutingModule } from './processos.routing';
import { CadastroProcessoComponent } from './cadastro-processo/cadastro-processo.component';
import { ListaProcessosComponent } from './lista-processos/lista-processos.component';

@NgModule({
  declarations: [CadastroProcessoComponent, ListaProcessosComponent],

  imports: [PrimeNGModule, SharedModule, FormsModule, ProcessoRoutingModule],
})
export class ProcessoModule {}
