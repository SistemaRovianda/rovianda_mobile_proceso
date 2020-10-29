import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ReprocesingGrindingFormComponent} from "./reprocesing-grinding-form.component";
import { MatTableModule } from '@angular/material';

const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  MatTableModule
];

const COMMON_DECLARATIONS = [ReprocesingGrindingFormComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS
})
export class ReprocesingGrindingFormModule{}
