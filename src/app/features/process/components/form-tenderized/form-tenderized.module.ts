import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormTenderizedComponent } from "./form-tenderized.component";
import { ModalFormulationDetailsModule } from '../modal-formulation-details/modal-formulation-details.module';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  ModalFormulationDetailsModule
];

const COMMON_DECLARATIONS = [FormTenderizedComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
  entryComponents:[ModalFormulationDetailsComponent]
})
export class FormTenderizedModule {}
