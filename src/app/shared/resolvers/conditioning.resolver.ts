import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { Process } from "../models/process.interface";
import { SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS } from "src/app/features/process/store/recent-records/recent-records.selector";
import { conditioningSearchInformation } from "src/app/features/process/store/conditioning/conditioning.actions";
import { Storage } from "@ionic/storage";

@Injectable()
export class ConditioningResolver implements Resolve<boolean> {
  isSelected: boolean;
  constructor(private store: Store<AppState>, private storage: Storage) {
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isSelected) {
      this.store.dispatch(
        conditioningSearchInformation({
          processId: +localStorage.getItem("processId"),
        })
      );
    }
    return true;
  }
}
