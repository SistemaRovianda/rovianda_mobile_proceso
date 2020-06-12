import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GrindingService } from "src/app/shared/services/process-grinding.service";
import { AlertService } from "src/app/shared/services/alert.service";
import * as fromGrindingActions from "./grinding.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable()
export class GrindingEffects {
  constructor(
    private action$: Actions,
    private grindingService: GrindingService,
    private alert: AlertService
  ) {}

  loadDataGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingSearchInformation),
      exhaustMap((action) =>
        this.grindingService.getDataGrinding(action.processId).pipe(
          switchMap((grinding) => [
            fromGrindingActions.grindingLoadData(grinding),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            return throwError(error);
          })
        )
      )
    )
  );

  registerGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingRegister),
      exhaustMap((grinding) =>
        this.grindingService.registerGrinding(grinding, 6).pipe(
          switchMap((action) => [
            fromGrindingActions.grindingRegisterResult({ result: true }),
          ]),
          catchError((error) => {
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]),
              fromGrindingActions.grindingRegisterResult({ result: false });
            return throwError(error);
          })
        )
      )
    )
  );
}
