import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { SausageService } from "src/app/shared/services/process-sausage.service";
import * as fromSausageActions from "./sausage.actions";

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
          switchMap((sausage) => [
            fromSausageActions.sausageLoadData({ sausage }),
          ]),
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
        this.sausageService.registerSausage(sausage, 6).pipe(
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