import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService, provideNgxMask } from 'ngx-mask';


@NgModule({
  imports: [NgxSpinnerModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask(), NgxMaskService],
  exports:[
    NgxSpinnerModule, NgxMaskPipe, NgxMaskDirective
  ]
})
export class NgxModule {}
