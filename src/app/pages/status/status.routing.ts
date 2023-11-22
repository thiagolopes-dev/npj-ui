import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaStatusComponent } from "./lista-status/lista-status.component";
import { CadastroStatusComponent } from "./cadastro-status/cadastro-status.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
      path: '',
      component: ListaStatusComponent,
      canActivate: [AuthGuard],
      data: {roles: ['status']}
    },
    {
        path: 'novo',
        component: CadastroStatusComponent,
        canActivate: [AuthGuard],
        data: {roles: ['status']}
      },
      {
        path: ':id',
        component: CadastroStatusComponent,
        canActivate: [AuthGuard],
        data: {roles: ['status']}
      },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class StatusRoutingModule {}