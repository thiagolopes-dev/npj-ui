import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { ListaStatusComponent } from './lista-status/lista-status.component';
import { CadastroStatusComponent } from './cadastro-status/cadastro-status.component';
import { StatusRoutingModule } from './status.routing';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [ListaStatusComponent, CadastroStatusComponent],
  imports: [
    PrimeNGModule,
    FormsModule,
    StatusRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class StatusModule {}
