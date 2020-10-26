import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { SELECT_PROCESS_DETAIL_SECTION } from "src/app/features/process/store/process-detail/process-detail.selector";
import { reprocessingStartLoadOfListReprocessing } from "src/app/features/process/store/reprocessing/reprocessing.action";

@Injectable()
export class ReprocessingResolver implements Resolve<boolean> {
  section: string;
  constructor(private store: Store<AppState>) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    return true;
  }
}
