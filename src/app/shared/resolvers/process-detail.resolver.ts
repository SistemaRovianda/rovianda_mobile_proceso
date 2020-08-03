import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { stepperInitialState } from "src/app/features/process/store/stepper/stepper.action";
import { processDetailStartLoadProducts } from "src/app/features/process/store/process-detail/process-detail.actions";
import { SELECT_RECENT_RECORDS_PROCESS_PROCESS_ID } from "src/app/features/process/store/recent-records/recent-records.selector";

@Injectable()
export class ProcessDetailResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(stepperInitialState());
    this.store.dispatch(processDetailStartLoadProducts());
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_PROCESS_ID)
      .subscribe((processId) => {
        localStorage.setItem("processId", `${processId}`);
      });
    return true;
  }
}
