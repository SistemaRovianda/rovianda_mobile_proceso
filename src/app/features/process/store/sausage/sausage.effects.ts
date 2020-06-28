import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { SausageService } from "src/app/shared/services/process-sausage.service";
import * as fromSausageActions from "./sausage.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { SELECT_RECENT_RECORDS_PROCESS_SELECTED } from "../recent-records/recent-records.selector";

@Injectable()
export class SausageEffects {
  constructor(
    private action$: Actions,
    private sausageService: SausageService,
    private alert: AlertService
  ) {}

  loadDataSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageSearchInformation),
      exhaustMap((action) =>
        this.sausageService.getDataSausage(action.processId).pipe(
          switchMap((sausage) =>
            Object.keys(sausage).length > 0
              ? [fromSausageActions.sausageLoadData({ sausage })]
              : [fromSausageActions.sausageLoadData({ sausage: null })]
          ),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            return throwError(error);
          })
        )
      )
    )
  );

  registerSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageRegister),
      exhaustMap((sausage) =>
        this.sausageService
          .registerSausage(sausage, +localStorage.getItem("processId"))
          .pipe(
            switchMap((action) => [
              fromSausageActions.sausageRegisterResults({
                result: true,
              }),
            ]),
            catchError((error) => {
              this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
              fromSausageActions.sausageRegisterResults({
                result: false,
              });
              return throwError(error);
            })
          )
      )
    )
  );
}
