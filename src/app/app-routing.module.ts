import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'motivos', component: ListaMotivosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/seguranca/seguranca.module').then(
        (l) => l.SegurancaModule,
      ),
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
    path: 'agendamento',
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
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
