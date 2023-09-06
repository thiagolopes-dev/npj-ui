import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { PrimeNGModule } from './primeng.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule,BrowserAnimationsModule, AppRoutingModule, PrimeNGModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NavbarComponent]
})
export class AppModule {}
