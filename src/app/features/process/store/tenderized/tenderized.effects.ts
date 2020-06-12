import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { TenderizedService } from "src/app/shared/services/process-tenderized.service";
import * as fromTenderizedActions from "./tenderized.actions";

@Injectable()
export class TenderizedEffects {
  constructor(
    private action$: Actions,
    private tenderizedService: TenderizedService,
    private alert: AlertService
  ) {}

  loadDataTenderized = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedSearchInformation),
      exhaustMap((action) =>
        this.tenderizedService.getDataTenderized(action.processId).pipe(
          switchMap((tenderized) => [
            fromTenderizedActions.tenderizedLoadData({ tenderized }),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            return throwError(error);
          })
        )
      )
    )
  );

  registerTenderized = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedRegister),
      exhaustMap((tenderized) =>
        this.tenderizedService.registerTenderized(tenderized, 6).pipe(
          switchMap((action) => [
            fromTenderizedActions.tenderizedRegisterResults({
              result: true,
            }),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            fromTenderizedActions.tenderizedRegisterResults({
              result: false,
            });
            return throwError(error);
          })
        )
      )
    )
  );
}
