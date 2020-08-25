import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SausagePage } from "./sausage.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { FormSausageModule } from "../../components/form-sausage/form-sausage.module";

const COMMON_DECLARATIONS = [SausagePage];

const COMMON_IMPORTS = [
  CommonModule,
  TitleHeaderModule,
  IonicModule,
  FormsModule,
  ReactiveFormsModule,
  FormSausageModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class SausagePageModule {}
