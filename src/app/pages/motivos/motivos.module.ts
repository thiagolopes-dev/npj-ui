import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CadastroMotivoComponent } from './cadastro-motivo/cadastro-motivo.component';
import { ListaMotivosComponent } from './lista-motivos/lista-motivos.component';
import { MotivosRoutingModule } from './motivos.routing';

@NgModule({
  declarations: [CadastroMotivoComponent, ListaMotivosComponent],
  imports: [PrimeNGModule, MotivosRoutingModule, CommonModule],
})
export class MotivosModule {}
