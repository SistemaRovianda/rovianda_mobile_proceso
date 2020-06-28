import { Component, OnInit, Input } from "@angular/core";
import { Process } from "src/app/shared/models/process.interface";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { recentRecordsLoadSelectProcess } from "../../store/recent-records/recent-records.actions";
import { Router } from "@angular/router";
import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";

@Component({
  selector: "app-raw-recent-record",
  templateUrl: "./raw-recent-record.component.html",
  styleUrls: ["./raw-recent-record.component.scss"],
})
export class RawRecentRecordComponent implements OnInit {
  @Input() process: Process;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {}

  onClick() {
    this.store.dispatch(
      recentRecordsLoadSelectProcess({ processSelected: this.process })
    );
    this.router.navigate(["/process/process-detail"]);
  }
}
