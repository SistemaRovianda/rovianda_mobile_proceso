import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { IonicModule } from "@ionic/angular";
import { LoginModule } from "../components/login/login.module";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
  },
];

const COMMON_IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
  IonicModule,
  LoginModule,
];

const COMMON_DECLARATIONS = [LayoutComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class LayoutModule {}
