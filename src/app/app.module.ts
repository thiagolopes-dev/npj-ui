import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardsModule } from './pages/dashboards/dashboard.module';
import { SegurancaModule } from './pages/seguranca/seguranca.module';
import { SharedModule } from './pages/shared/shared.module';
import { PrimeNGModule } from './primeng.module';

registerLocaleData(localePt, 'pt');

// Configuração do ngx-mask
export const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SegurancaModule,
    AppRoutingModule,
    DashboardsModule,
    PrimeNGModule,
    NgxSpinnerModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideNgxMask(maskConfig),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
