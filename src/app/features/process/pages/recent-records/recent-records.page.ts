import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import * as fromBasicRegisterActions from "../../store/basic-register/basic-register.actions";
import { signOut } from "src/app/features/landing/store/login/login.action";
import { recentRecordsLoadTypeRegister } from "../../store/recent-records/recent-records.actions";

@Component({
  selector: "app-recent-records",
  templateUrl: "./recent-records.page.html",
  styleUrls: ["./recent-records.page.scss"],
})
export class RecentRecordsPage implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {}

  logout(evt) {
    this.store.dispatch(signOut());
  }

  onClick() {
    this.router.navigate(["process/process-detail"]);
    localStorage.setItem("processId", `-1`);
    this.store.dispatch(
      recentRecordsLoadTypeRegister({
        isNewRegister: true,
        path: "/process/recent-records",
      })
    );
  }
}
