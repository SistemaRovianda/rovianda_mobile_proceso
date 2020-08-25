import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ConditioningPage } from "./conditioning.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { FormConditioningModule } from '../../components/form-conditioning/form-conditioning.module';

const COMMON_DECLARATIONS = [ConditioningPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FormConditioningModule
];
@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class ConditioningPageModule {}
