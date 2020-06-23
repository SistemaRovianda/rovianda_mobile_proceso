import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConditioningService } from "src/app/shared/services/process-conditioning.service";
import * as fromConditioningActions from "./conditioning.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";

@Injectable()
export class ConditioningEffects {
  constructor(
    private action$: Actions,
    private conditioningService: ConditioningService,
    private alert: AlertService
  ) {}

  loadDataConditioning = createEffect(() =>
    this.action$.pipe(
      ofType(fromConditioningActions.conditioningSearchInformation),
      exhaustMap((action) =>
        this.conditioningService.getDataConditioning(action.processId).pipe(
          switchMap((conditioning) => [
            fromConditioningActions.conditioningLoadData({ conditioning }),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            return throwError(error);
          })
        )
      )
    )
  );

  registerConditioning = createEffect(() =>
    this.action$.pipe(
      ofType(fromConditioningActions.conditioningRegister),
      exhaustMap((conditioning) =>
        this.conditioningService.registerConditioning(conditioning, 6).pipe(
          switchMap((action) => [
            fromConditioningActions.conditioningRegisterResults({
              result: true,
            }),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            fromConditioningActions.conditioningRegisterResults({
              result: false,
            });
            return throwError(error);
          })
        )
      )
    )
  );
}
