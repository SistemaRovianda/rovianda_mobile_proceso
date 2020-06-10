import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { UserPage } from "./user.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { StepperModule } from "../../components/stepper/stepper.module";
import { FormUsersModule } from "../../components/form-users/form-users.module";

const COMMON_DECLARATIONS = [UserPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  StepperModule,
  FormUsersModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class UserPageModule {}
