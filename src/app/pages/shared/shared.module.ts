import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UppercaseDirective } from '../uppercase.directive';
import { MessageComponent } from './message.component';

@NgModule({
  declarations: [
   MessageComponent,
   UppercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    UppercaseDirective
   ],
})
export class SharedModule { }