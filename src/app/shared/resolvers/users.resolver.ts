import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AppState } from "../models/store.state.interface";
import { Store } from "@ngrx/store";
import {
  userStartLoadUsers,
  userSearchInformation,
} from "src/app/features/process/store/user/user.actions";

@Injectable()
export class UserResolver implements Resolve<boolean> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(userStartLoadUsers());
    this.store.dispatch(
      userSearchInformation({ processId: +localStorage.getItem("processId") })
    );
    return true;
  }
}
