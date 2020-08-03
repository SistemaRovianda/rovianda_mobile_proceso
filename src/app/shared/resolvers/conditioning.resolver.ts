import { Injectable } from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { Process } from "../models/process.interface";
import { SELECT_RECENT_RECORDS_PROCESS_SELECTED } from "src/app/features/process/store/recent-records/recent-records.selector";
import { conditioningSearchInformation } from "src/app/features/process/store/conditioning/conditioning.actions";
import { Storage } from "@ionic/storage";

@Injectable()
export class ConditioningResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>, private storage: Storage) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(
      conditioningSearchInformation({
        processId: +localStorage.getItem("processId"),
      })
    );

    return true;
  }
}
