import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { ButtonMenuComponent } from "./button-menu.component";

const COMMON_IMPORTS = [CommonModule, IonicModule];
const COMMON_DECLARATIONS = [ButtonMenuComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class ButtonMenuModule {}
