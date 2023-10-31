import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './pages/shared/shared.module';
import { PrimeNGModule } from './primeng.module';

import { NgxModule } from './ngx.module';
import { SegurancaModule } from './pages/seguranca/seguranca.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SegurancaModule,
    AppRoutingModule,
    PrimeNGModule,
    SharedModule,
    NgxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
