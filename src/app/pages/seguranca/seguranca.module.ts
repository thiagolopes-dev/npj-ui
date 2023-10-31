import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { PrimeNGModule } from 'src/app/primeng.module';
import { environment } from 'src/environment/environment';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NpjHttpInterceptor } from './npj-http';
import { SegurancaRoutingModule } from './seguranca.routing';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent],
  imports: [
   PrimeNGModule,
   SegurancaRoutingModule,
   SharedModule,
   JwtModule.forRoot({
    config: {
      // tslint:disable-next-line: object-literal-shorthand
      tokenGetter: tokenGetter,
      allowedDomains: environment.whiteListedDomains,
      disallowedRoutes: environment.blackListedRoutes
    }
}),
],
providers: [

  AuthGuard,
  JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: NpjHttpInterceptor,
    multi: true
}
  ],
  exports: []
})
export class SegurancaModule { }


























































