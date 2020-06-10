import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { BasicRegistrationPage } from "./basic-registration.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { StepperModule } from "../../components/stepper/stepper.module";
import { FormBasicRegistrationModule } from "../../components/form-basic-registration/form-basic-registration.module";

const COMMON_DECLARATIONS = [BasicRegistrationPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  StepperModule,
  FormBasicRegistrationModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class BasicRegistrationPageModule {}
