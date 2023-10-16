import { NgModule } from '@angular/core';
import { ListaAcompanhamentosComponent } from './lista-acompanhamentos/lista-acompanhamentos.component';
import { CadastroAcompanhamentoComponent } from './cadastro-acompanhamento/cadastro-acompanhamento.component';
import { AcompanhamentosRoutingModule } from './acompanhamentos.routing';
import { PrimeNGModule } from 'src/app/primeng.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListaAcompanhamentosComponent, CadastroAcompanhamentoComponent],
  imports: [PrimeNGModule, SharedModule, FormsModule, AcompanhamentosRoutingModule],
})
export class AcompanhamentosModule { }
