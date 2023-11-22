import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { CadastroMotivoComponent } from './cadastro-motivo/cadastro-motivo.component';
import { ListaMotivosComponent } from './lista-motivos/lista-motivos.component';
import { MotivosRoutingModule } from './motivos.routing';

@NgModule({
  declarations: [
    CadastroMotivoComponent, 
    ListaMotivosComponent
  ],
  imports: [
    PrimeNGModule, 
    SharedModule, 
    FormsModule, 
    MotivosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class MotivosModule {}
