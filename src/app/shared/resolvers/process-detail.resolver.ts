import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import {
  processDetailStartLoadProducts,
  processDetailStartLoadProductsRovianda,
  processDetailStartLoadLotsMeatProcess,
} from "src/app/features/process/store/process-detail/process-detail.actions";
import { SELECT_RECENT_RECORDS_PROCESS_PROCESS_ID } from "src/app/features/process/store/recent-records/recent-records.selector";

@Injectable()
export class ProcessDetailResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(processDetailStartLoadProducts());
    //this.store.dispatch(processDetailStartLoadMaterials());
    this.store.dispatch(processDetailStartLoadProductsRovianda());
    this.store.dispatch(processDetailStartLoadLotsMeatProcess());
    return true;
  }
}
