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
import { sausageSearchInformation } from "src/app/features/process/store/sausage/sausage.actions";
import { setSection } from 'src/app/features/process/store/sections/section.actions';

@Injectable()
export class SausageResolver implements Resolve<boolean> {
  isSelected: boolean;
  constructor(private store: Store<AppState>) {
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS)
      .subscribe((selected) => (this.isSelected = selected));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(setSection({section:"SAUSAGE"}));
    return true;
  }
}
