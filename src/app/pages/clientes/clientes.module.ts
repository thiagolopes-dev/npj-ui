import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes.routing';
import { SharedModule } from '../shared/shared.module';
import { NgxModule } from 'src/app/ngx.module';

@NgModule({
  declarations: [CadastroClienteComponent, ListaClientesComponent],
  imports: [
    FormsModule,
    PrimeNGModule,
    ClientesRoutingModule,
    SharedModule,
    NgxModule,
    
  ],
})
export class ClientesModule {}
