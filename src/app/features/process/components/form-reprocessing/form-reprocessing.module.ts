import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormReprocessingComponent } from "./form-reprocessing.component";

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMON_DECLARATIONS = [FormReprocessingComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class FormReprocessingModule {}
