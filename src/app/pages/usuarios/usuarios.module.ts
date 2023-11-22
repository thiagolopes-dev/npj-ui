import { NgModule } from '@angular/core';
import { ValidateEqualModule } from 'ng-validate-equal';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UsuariosRountingModule } from './usuarios.routing';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';



@NgModule({
  declarations: [
    UsuarioCadastroComponent,
    UsuariosListaComponent,
    AlterarSenhaComponent
  ],

  imports: [
    PrimeNGModule,
    UsuariosRountingModule,
    ValidateEqualModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ]
})
export class UsuariosModule { }