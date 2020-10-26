import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormSausageComponent } from "./form-sausage.component";
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

const COMMON_DECLARATIONS = [FormSausageComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
  entryComponents:[ModalFormulationDetailsComponent]
})
export class FormSausageModule {}
