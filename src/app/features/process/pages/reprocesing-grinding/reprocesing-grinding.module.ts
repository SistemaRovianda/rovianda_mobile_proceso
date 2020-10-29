import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReprocesingGrindingPage } from './reprocesing-grinding.page';
import { TitleHeaderModule } from '../../components/title-header/title-header.module';
import { ReprocesingGrindingFormModule } from '../../components/reprocesing-grinding/reprocesing-grinding-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitleHeaderModule,
    ReprocesingGrindingFormModule
  ],
  declarations: [ReprocesingGrindingPage]
})
export class ReprocesingGrindingPageModule {}
