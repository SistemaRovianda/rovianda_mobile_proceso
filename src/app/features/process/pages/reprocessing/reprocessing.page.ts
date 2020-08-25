import { Component, OnInit } from "@angular/core";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";
import { Router } from "@angular/router";
import { Reprocessing } from "src/app/shared/models/reprocessing.interface";
import { Observable } from "rxjs";
import {
  SELECT_REPROCESSING_LIST_REPROCESSIG,
  SELECT_REPROCESSING_IS_LOADING,
} from "../../store/reprocessing/reprocessing.selector";
import { reprocessingStartReprocessing } from "../../store/reprocessing/reprocessing.action";

@Component({
  selector: "app-reprocessing",
  templateUrl: "./reprocessing.page.html",
  styleUrls: ["./reprocessing.page.scss"],
})
export class ReprocessingPage implements OnInit {
  currentSection: MenuButton;

  loading: boolean;

  constructor(private store: Store<AppState>, private router: Router) {}

  listReprocessing$: Observable<Reprocessing[]> = this.store.select(
    SELECT_REPROCESSING_LIST_REPROCESSIG
  );

  ngOnInit() {
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.currentSection = section));
    this.store
      .select(SELECT_REPROCESSING_IS_LOADING)
      .subscribe((loading) => (this.loading = loading));
  }
  onSubmit(form) {
    console.log(form);
    this.store.dispatch(reprocessingStartReprocessing(form));
  }

  onBackButton() {
    this.router.navigate([this.currentSection.path]);
  }
}
