import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReprocessingPage } from "./reprocessing.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { FormReprocessingModule } from "../../components/form-reprocessing/form-reprocessing.module";

const COMMON_DECLARATIONS = [ReprocessingPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FormReprocessingModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class ReprocessingPageModule {}
