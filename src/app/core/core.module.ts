import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from 'primeng/toast';
import { MotivosService } from "../pages/motivos/motivos.service";
import { PrimeNGModule } from "../primeng.module";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { VarasService } from "../pages/varas/varas.service";
import { ClientesService } from "../pages/clientes/clientes.service";
import { StatusService } from "../pages/status/status.service";


@NgModule({
    declarations: [
        NavbarComponent
    ],
imports:[
    PrimeNGModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule
],
providers:[
    MessageService,
    ConfirmationService,
    MotivosService,
    VarasService,
    ClientesService,
    StatusService
],
exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
]
})

export class CoreModule {}