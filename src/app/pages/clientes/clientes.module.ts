import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { ClientesRoutingModule } from './clientes.routing';
@NgModule({
  declarations: [
    CadastroClienteComponent,
    ListaClientesComponent,

  ],
  imports: [
    FormsModule,
    PrimeNGModule,
    ClientesRoutingModule

  ],
})
export class ClientesModule { }
