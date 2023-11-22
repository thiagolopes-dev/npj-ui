import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core/layout/navbar/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/layout/navbar/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [

  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboards/dashboard.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'motivos',
    loadChildren: () =>
      import('./pages/motivos/motivos.module').then((m) => m.MotivosModule),
  },
  {
    path: 'varas',
    loadChildren: () =>
      import('./pages/varas/varas.module').then((v) => v.VarasModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./pages/clientes/clientes.module').then((c) => c.ClientesModule),
  },
  {
    path: 'status',
    loadChildren: () =>
      import('./pages/status/status.module').then((s) => s.StatusModule),
  },
  {
    path: 'agendamentos',
    loadChildren: () =>
      import('./pages/agendamentos/agendamentos.module').then(
        (s) => s.AgendamentosModule,
      ),
  },
  {
    path: 'processos',
    loadChildren: () =>
      import('./pages/processos/processos.module').then(
        (p) => p.ProcessoModule,
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then(
        (s) => s.UsuariosModule,
      ),
  },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
