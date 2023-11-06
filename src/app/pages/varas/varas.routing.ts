import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroVaraComponent } from "./cadastro-varas/cadastro-varas.component";
import { ListaVarasComponent } from "./lista-varas/lista-varas.component";
import { AuthGuard } from "../seguranca/auth.guard";

const routes: Routes = [
    {
      path: '',
      component: ListaVarasComponent,
      canActivate: [AuthGuard],
      data: {roles: ['varas']}
    },
    {
        path: 'novo',
        component: CadastroVaraComponent,
        canActivate: [AuthGuard],
        data: {roles: ['varas']}
      },
      {
        path: ':id',
        component: CadastroVaraComponent,
        canActivate: [AuthGuard],
        data: {roles: ['varas']}
      },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class VarasRoutingModule {}