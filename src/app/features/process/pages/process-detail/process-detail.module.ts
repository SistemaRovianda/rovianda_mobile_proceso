import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { ProcessDetailPage } from "./process-detail.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { ButtonMenuModule } from "../../components/button-menu/button-menu.module";

const COMMON_DECLARATIONS = [ProcessDetailPage];

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  TitleHeaderModule,
  ButtonMenuModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
  exports: COMMON_DECLARATIONS,
})
export class ProcessDetailPageModule {}
