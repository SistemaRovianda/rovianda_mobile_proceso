import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { LoginComponent } from "./login.component";

const COMMON_IMPORTS = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule,
];

const COMMON_DECLARATIONS = [LoginComponent];
@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class LoginModule {}
