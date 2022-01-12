import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSubProductComponent } from './modal-sub-product.component';
import { IonicModule } from '@ionic/angular';
import { ProcessSubProductService } from 'src/app/shared/services/process-subproduct.service';



@NgModule({
  declarations: [ModalSubProductComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers:[ProcessSubProductService],
  exports: [ModalSubProductComponent]
})
export class ModalSubProductModule { }
