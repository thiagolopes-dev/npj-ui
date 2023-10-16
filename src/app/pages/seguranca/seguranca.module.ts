import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from 'src/app/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SegurancaRoutingModule } from './seguranca.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [PrimeNGModule, FormsModule, SegurancaRoutingModule, SharedModule],
})
export class SegurancaModule {}




































































































