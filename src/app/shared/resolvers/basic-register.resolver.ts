import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../models/store.state.interface";
import { SELECT_RECENT_RECORDS_IS_SELECTED } from "src/app/features/process/store/recent-records/recent-records.selector";
import { basicRegisterStartLoadMaterials } from "src/app/features/process/store/basic-register/basic-register.actions";

@Injectable()
export class BasicRegisterResolver implements Resolve<boolean> {
  isSelected: boolean;
  constructor(private store: Store<AppState>) {
    this.store
      .select(SELECT_RECENT_RECORDS_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isSelected) {
      this.store.dispatch(basicRegisterStartLoadMaterials());
    }
    return true;
  }
}
