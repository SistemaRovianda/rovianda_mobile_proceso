import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { signOut } from "src/app/features/landing/store/login/login.action";

@Component({
  selector: "app-title-header",
  templateUrl: "./title-header.component.html",
  styleUrls: ["./title-header.component.scss"],
})
export class TitleHeaderComponent implements OnInit {
  @Input() titlePath: string;
  @Input() path: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  signOut() {
    this.store.dispatch(signOut());
  }
}
