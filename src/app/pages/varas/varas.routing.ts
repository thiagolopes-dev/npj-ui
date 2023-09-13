import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaVarasComponent } from "./lista-varas/lista-varas.component";
import { CadastroVaraComponent } from "./cadastro-varas/cadastro-varas.component";

const routes: Routes = [
    {
      path: '',
      component: ListaVarasComponent,
    },
    {
        path: 'novo',
        component: CadastroVaraComponent,
      },
      {
        path: ':id',
        component: CadastroVaraComponent,
      },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class VarasRoutingModule {}