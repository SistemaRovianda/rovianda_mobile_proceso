import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RecentRecordsPage } from "./recent-records.page";
import { TitleHeaderModule } from "../../components/title-header/title-header.module";
import { TableRecentRecordModule } from "../../components/table-recent-record/table-recent-record.module";

const COMMON_DECLARATIONS = [RecentRecordsPage];
const COMMON_IMPORTS = [
  CommonModule,
  IonicModule,
  TitleHeaderModule,
  TableRecentRecordModule,
];

@NgModule({
  imports: COMMON_IMPORTS,
  declarations: COMMON_DECLARATIONS,
})
export class RecentRecordsPageModule {}
