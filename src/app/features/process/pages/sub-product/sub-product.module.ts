import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProductComponent } from './sub-product.component';
import { FormSubProductModule } from '../../components/form-sub-product/form-sub-product.module';
import { IonicModule } from '@ionic/angular';
import { TitleHeaderModule } from '../../components/title-header/title-header.module';
import { MatDialogModule } from '@angular/material';
import { ProcessSubProductService } from 'src/app/shared/services/process-subproduct.service';
import { FormAddSubProductModule } from '../../components/form-add-sub-product/form-add-sub-product.module';
import { FormAddSubProductComponent } from '../../components/form-add-sub-product/form-add-sub-product.component';



@NgModule({
  declarations: [SubProductComponent],
  imports: [
    TitleHeaderModule,
    CommonModule,
    FormSubProductModule,
    IonicModule,
    FormAddSubProductModule
  ],
  providers:[ProcessSubProductService],
  exports: [SubProductComponent,FormAddSubProductComponent]
})
export class SubProductModule { }
