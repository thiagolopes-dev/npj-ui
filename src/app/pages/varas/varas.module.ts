import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { CadastroVaraComponent } from './cadastro-varas/cadastro-varas.component';
import { ListaVarasComponent } from './lista-varas/lista-varas.component';
import { VarasRoutingModule } from './varas.routing';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [ListaVarasComponent, CadastroVaraComponent],
  imports: [
    PrimeNGModule,
    SharedModule,
    FormsModule,
    VarasRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
})
export class VarasModule {}
