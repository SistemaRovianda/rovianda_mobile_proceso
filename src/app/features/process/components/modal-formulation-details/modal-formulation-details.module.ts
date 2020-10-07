import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalFormulationDetailsComponent } from './modal-formulation-details.component';
import {MatButtonModule} from '@angular/material/button';
const COMMON_IMPORTS = [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ];
  
  const COMMON_DECLARATIONS = [ModalFormulationDetailsComponent];
  
  @NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS
  })
  export class ModalFormulationDetailsModule {}
