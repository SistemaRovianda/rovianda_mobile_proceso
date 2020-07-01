import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { SELECT_RECENT_RECORDS_PROCESS_SELECTED } from "src/app/features/process/store/recent-records/recent-records.selector";
import { Process } from "../models/process.interface";
import * as fromGrindingActions from "../../features/process/store/grinding/grinding.actions";

@Injectable()
export class GrindingResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(
      fromGrindingActions.grindingSearchInformation({
        processId: +localStorage.getItem("processId"),
      })
    );

    return true;
  }
}
