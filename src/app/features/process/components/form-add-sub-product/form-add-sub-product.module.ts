import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddSubProductComponent } from './form-add-sub-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormAddSubProductComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[FormAddSubProductComponent]
})
export class FormAddSubProductModule { }
