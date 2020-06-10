import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormBasicRegistrationComponent } from "./form-basic-registration.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertService } from "src/app/shared/services/alert.service";

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
];

const COMMON_DECLARATIONS = [FormBasicRegistrationComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS
})
export class FormBasicRegistrationModule {}
