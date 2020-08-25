import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "src/app/features/process/store/recent-records/recent-records.selector";
import * as fromGrindingActions from "../../features/process/store/grinding/grinding.actions";

@Injectable()
export class GrindingResolver implements Resolve<boolean> {
  isSelected: boolean;
  constructor(private store: Store<AppState>) {
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isSelected) {
      this.store.dispatch(
        fromGrindingActions.grindingSearchInformation({
          processId: +localStorage.getItem("processId"),
        })
      );
    }
    return true;
  }
}
