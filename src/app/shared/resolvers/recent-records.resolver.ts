import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { recentRecordsStartLoad } from "src/app/features/process/store/recent-records/recent-records.actions";

@Injectable()
export class RecentRecordsResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(recentRecordsStartLoad({ status: "ACTIVE" }));
    return true;
  }
}
