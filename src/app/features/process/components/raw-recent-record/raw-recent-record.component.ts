import { Component, OnInit, Input } from "@angular/core";
import { Process } from "src/app/shared/models/process.interface";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import {
  recentRecordsLoadSelectProcess,
  recentRecordsLoadTypeRegister,
} from "../../store/recent-records/recent-records.actions";
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
      recentRecordsLoadSelectProcess({
        processSelected: this.checkProcess() ? this.process : null,
      })
    );
    localStorage.setItem("processId", `${this.process.processId}`);
    this.store.dispatch(
      recentRecordsLoadTypeRegister({
        isNewRegister: false,
        path: "/process/process-detail",
      })
    );
    this.router.navigate(["/process/process-detail"]);
  }

  checkProcess() {
    return (
      this.process.startDate !== "" &&
      this.process.entranceHour !== "" &&
      this.process.productName !== "" &&
      this.process.weigth > 0 &&
      this.process.loteInterno !== "" &&
      this.process.temperature > 0
    );
  }
}
