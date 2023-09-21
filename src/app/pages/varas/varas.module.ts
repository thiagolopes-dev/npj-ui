import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { ListaVarasComponent } from './lista-varas/lista-varas.component';
import { VarasRoutingModule } from './varas.routing';
import { CadastroVaraComponent } from './cadastro-varas/cadastro-varas.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListaVarasComponent, CadastroVaraComponent],
  imports: [PrimeNGModule, FormsModule, VarasRoutingModule, SharedModule],
})
export class VarasModule {}
