import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSubProductComponent } from './form-sub-product.component';
import { IonicModule } from '@ionic/angular';
import { MatDialogModule } from '@angular/material';
import { ModalSubProductComponent } from '../modal-sub-product/modal-sub-product.component';
import { ModalSubProductModule } from '../modal-sub-product/modal-sub-product.module';



@NgModule({
  declarations: [FormSubProductComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatDialogModule,
    ModalSubProductModule
  ],
  exports: [FormSubProductComponent],
  entryComponents:[ModalSubProductComponent]
})
export class FormSubProductModule { }
