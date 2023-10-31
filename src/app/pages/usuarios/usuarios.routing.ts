import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';

const routes: Routes = [

  {
    path: '', component: UsuariosListaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'novo', component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'alterarsenhausuario', component: AlterarSenhaComponent
  },
  {
    path: ':id', component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/senha', component: AlterarSenhaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosRountingModule { }

