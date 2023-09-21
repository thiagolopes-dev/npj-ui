import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaStatusComponent } from "./lista-status/lista-status.component";
import { CadastroStatusComponent } from "./cadastro-status/cadastro-status.component";

const routes: Routes = [
    {
      path: '',
      component: ListaStatusComponent,
    },
    {
        path: 'novo',
        component: CadastroStatusComponent,
      },
      {
        path: ':id',
        component: CadastroStatusComponent,
      },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class StatusRoutingModule {}