import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { signOut } from "src/app/features/landing/store/login/login.action";

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
    this.router.navigate(["process/basic-registration"]);
  }
}
