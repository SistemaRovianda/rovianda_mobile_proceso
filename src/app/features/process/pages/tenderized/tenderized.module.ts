import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TenderizedPage } from "./tenderized.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { StepperModule } from "../../components/stepper/stepper.module";
import { FormTenderizedModule } from "../../components/form-tenderized/form-tenderized.module";

const COMMON_DECLARATIONS = [TenderizedPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  StepperModule,
  FormTenderizedModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class TenderizedPageModule {}
