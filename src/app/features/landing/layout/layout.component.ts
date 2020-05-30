import { Component, OnInit } from "@angular/core";
import { SignIn, AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import * as fromLoginActions from "../store/login/login.action";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  onLogin(payload: SignIn) {
    this.store.dispatch(fromLoginActions.signIn(payload));
  }
}
