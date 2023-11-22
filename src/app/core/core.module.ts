import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ClientesService } from '../pages/clientes/clientes.service';
import { MotivosService } from '../pages/motivos/motivos.service';
import { ProcessosService } from '../pages/processos/processos.service';
import { AuthService } from '../pages/seguranca/auth.service';
import { StatusService } from '../pages/status/status.service';
import { UsuariosService } from '../pages/usuarios/usuarios.service';
import { VarasService } from '../pages/varas/varas.service';
import { PrimeNGModule } from '../primeng.module';
import { ErrorHandlerService } from './errorhandler.service';
import { NaoAutorizadoComponent } from './layout/navbar/nao-autorizado/nao-autorizado.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './layout/navbar/pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    NavbarComponent,   
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    PrimeNGModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    AuthService,
    JwtHelperService,
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    MotivosService,
    VarasService,
    ClientesService,
    StatusService,
    ProcessosService,
    UsuariosService
  ],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
})
export class CoreModule {}
