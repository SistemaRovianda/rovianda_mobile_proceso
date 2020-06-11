import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";

@Component({
  selector: "app-recent-records",
  templateUrl: "./recent-records.page.html",
  styleUrls: ["./recent-records.page.scss"],
})
export class RecentRecordsPage implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {}

  onClick() {
    this.store.dispatch(
      fromBasicRegisterActions.basicRegisterLoadStatus({ status: "NOTUSED" })
    );
    this.router.navigate(["process/basic-registration"]);
  }
}
