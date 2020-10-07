import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormConditioningComponent } from "./form-conditioning.component";
import {MatDialogModule} from '@angular/material';

import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { ModalFormulationDetailsModule } from '../modal-formulation-details/modal-formulation-details.module';
const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  ModalFormulationDetailsModule
];

const COMMON_DECLARATIONS = [FormConditioningComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
  entryComponents: [ModalFormulationDetailsComponent]
})
export class FormConditioningModule {}
