import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TableRecentRecordComponent } from "./table-recent-record.component";
import { RawRecentRecordModule } from "../raw-recent-record/raw-recent-record.module";

const COMMON_IMPORTS = [CommonModule, IonicModule, RawRecentRecordModule];

const COMMON_DECLARATIONS = [TableRecentRecordComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  exports: COMMON_DECLARATIONS,
})
export class TableRecentRecordModule {}
