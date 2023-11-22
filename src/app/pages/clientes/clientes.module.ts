import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { InputMaskModule } from 'primeng/inputmask';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ClientesRoutingModule } from './clientes.routing';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';


@NgModule({
  declarations: [CadastroClienteComponent, ListaClientesComponent],
  imports: [
    FormsModule,
    PrimeNGModule,
    ClientesRoutingModule,
    SharedModule,
    InputMaskModule,
    NgxMaskDirective,
    NgxMaskPipe,
    
  ],
})
export class ClientesModule {}
