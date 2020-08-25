import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { GrindingPage } from "./grinding.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { FormGrindingModule } from "../../components/form-grinding/form-grinding.module";

const COMMON_DECLARATIONS = [GrindingPage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FormGrindingModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class GrindingPageModule {}
