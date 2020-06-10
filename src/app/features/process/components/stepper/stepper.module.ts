import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { StepperComponent } from "./stepper.component";

const COMMON_IMPORTS = [CommonModule, IonicModule];
const COMMON_DECLARATIONS = [StepperComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class StepperModule {}
