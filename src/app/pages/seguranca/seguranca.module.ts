import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { CoreModule } from 'src/app/core/core.module';
import { PrimeNGModule } from 'src/app/primeng.module';
import { environment } from 'src/environments/environment';
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
    CommonModule,
    CoreModule,
    SegurancaRoutingModule,
    PrimeNGModule,
    MessagesModule,
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: []
})
export class SegurancaModule { }
