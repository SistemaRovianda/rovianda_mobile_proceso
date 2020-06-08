import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Process } from "src/app/shared/models/process.interface";
import { SELECT_RECENT_RECORDS_PROCESS } from "../../store/recent-records/recent-records.selector";

@Component({
  selector: "app-table-recent-record",
  templateUrl: "./table-recent-record.component.html",
  styleUrls: ["./table-recent-record.component.scss"],
})
export class TableRecentRecordComponent implements OnInit {
  constructor(private _store: Store<AppState>) {}

  recentProcess: Process[];

  ngOnInit() {
    this._store
      .select(SELECT_RECENT_RECORDS_PROCESS)
      .subscribe((process) => (this.recentProcess = process));
  }
}
