import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgxModule } from '../ngx.module';
import { ClientesService } from '../pages/clientes/clientes.service';
import { MotivosService } from '../pages/motivos/motivos.service';
import { StatusService } from '../pages/status/status.service';
import { VarasService } from '../pages/varas/varas.service';
import { PrimeNGModule } from '../primeng.module';
import { ErrorHandlerService } from './errorhandler.service';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ProcessosService } from '../pages/processos/processos.service';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    PrimeNGModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
    NgxModule,
  ],
  providers: [
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    MotivosService,
    VarasService,
    ClientesService,
    StatusService,
    ProcessosService,
  ],
  exports: [NavbarComponent, ToastModule, ConfirmDialogModule],
})
export class CoreModule {}
