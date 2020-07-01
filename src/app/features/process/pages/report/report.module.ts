import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ReportPage } from "./report.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";

const COMMON_DECLARATIONS = [ReportPage];

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  TitleHeaderModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class ReportPageModule {}
