import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  exports: [CommonModule, FormsModule, ButtonModule, TableModule],
})
export class PrimeNGModule {}
