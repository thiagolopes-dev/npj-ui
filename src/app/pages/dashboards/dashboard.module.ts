import { NgModule } from '@angular/core';
import { PrimeNGModule } from 'src/app/primeng.module';

import { SharedModule } from '../shared/shared.module';
import { DashboardsRountingModule } from './dashboard.routing';
import { PrincipalComponent } from './principal/principal.component';


@NgModule({
  declarations: [
   PrincipalComponent
  ],
  imports: [
    PrimeNGModule,
    DashboardsRountingModule,
    SharedModule
  ]
})
export class DashboardsModule { }
