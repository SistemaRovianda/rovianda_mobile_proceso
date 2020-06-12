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
import { sausageSearchInformation } from 'src/app/features/process/store/sausage/sausage.actions';

@Injectable()
export class SausageResolver implements Resolve<boolean> {
  process: Process;
  constructor(private store: Store<AppState>) {
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SELECTED)
      .subscribe((tempProcess) => (this.process = tempProcess));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.process != null) {
      this.store.dispatch(
        sausageSearchInformation({ processId: this.process.processId })
      );
    }
    return true;
  }
}