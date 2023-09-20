import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { SegurancaRoutingModule } from './seguranca.routing';



@NgModule({
  declarations: [
    LoginComponent
  ],

  imports: [
    PrimeNGModule,
    SharedModule,
    SegurancaRoutingModule,
    
  ],

})
export class SegurancaModule { }