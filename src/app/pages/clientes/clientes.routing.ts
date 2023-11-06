import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListaClientesComponent,
    canActivate: [AuthGuard],
    data: {roles: ['clientes']}
  },
  {
    path: 'novo',
    component: CadastroClienteComponent,
    canActivate: [AuthGuard],
    data: {roles: ['clientes']}
  },
  {
    path: ':id',
    component: CadastroClienteComponent,
    canActivate: [AuthGuard],
    data: {roles: ['clientes']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}