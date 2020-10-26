import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormGrindingComponent } from "./form-grinding.component";
import { ModalFormulationDetailsModule } from '../modal-formulation-details/modal-formulation-details.module';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { MatTableModule } from '@angular/material';

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  ModalFormulationDetailsModule,
  MatTableModule
];

const COMMON_DECLARATIONS = [FormGrindingComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
  entryComponents:[ModalFormulationDetailsComponent]
})
export class FormGrindingModule {}
