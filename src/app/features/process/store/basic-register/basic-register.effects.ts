import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MeatService } from "src/app/shared/services/meat.service";
import * as fromBasicRegisterActions from "./basic-register.actions";
import { exhaustMap, switchMap, catchError, tap } from "rxjs/operators";
import { BasicRegisterService } from "src/app/shared/services/process-basic-register.service";
import { of, throwError } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";

@Injectable()
export class BasicRegisterEffect {
  constructor(
    private action$: Actions,
    private meatService: MeatService,
    private basicRegisterService: BasicRegisterService,
    private alert: AlertService
  ) {}

  loadLotsMeatEffect = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterLoadStatus),
      exhaustMap((action) =>
        this.meatService.getLotsMeat(action.status).pipe(
          switchMap((lots) => [
            fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat({
              lots,
            }),
          ])
        )
      )
    )
  );

  regiterNewProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromBasicRegisterActions.basicRegisterStartRegisterNewProcess),
      exhaustMap((action) =>
        this.basicRegisterService.basicRegisterProcess(action.newProcess).pipe(
          switchMap((action) => [
            fromBasicRegisterActions.basicRegisterLoadResultsNewRegisterProcess(
              { result: true }
            ),
          ]),
          catchError((error) => {
            console.log(error);
            this.alert.showAlert("Error", error.error.msg, ["Aceptar"]);
            return throwError(error);
          })
        )
      )
    )
  );
}
