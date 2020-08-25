import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromReprocessingActions from "./reprocessing.action";
import { ReprocessingService } from "src/app/shared/services/reprocessing.service";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { ToastService } from "src/app/shared/services/toast.service";
import { of, from } from "rxjs";
import { createAction } from "@ngrx/store";
import { Router } from "@angular/router";
@Injectable()
export class ReprocessingEffects {
  constructor(
    private action$: Actions,
    private reprocessingService: ReprocessingService,
    private toastService: ToastService,
    private router: Router
  ) {}

  loadListReprocessing = createEffect(() =>
    this.action$.pipe(
      ofType(fromReprocessingActions.reprocessingStartLoadOfListReprocessing),
      exhaustMap((action) =>
        this.reprocessingService.getListReprocessing(action.section).pipe(
          switchMap((listReprocessing) => {
            if (listReprocessing.length <= 0) {
              this.toastService.presentToastMessageWarning(
                "Seccion sin reprocesos registrados"
              );
            }

            return [
              fromReprocessingActions.reprocessingLoadListOfListReprocessing({
                listReprocessing,
              }),
            ];
          })
        )
      )
    )
  );

  startAssingReprocessingToProcess = createEffect(() =>
    this.action$.pipe(
      ofType(fromReprocessingActions.reprocessingStartReprocessing),
      exhaustMap((reprocessing) =>
        this.reprocessingService.registerReprocessing(reprocessing).pipe(
          switchMap((action) => {
            this.toastService.presentToastSuccess();
            return [
              fromReprocessingActions.reprocessigFinish(),
              fromReprocessingActions.reprocessingSucces(),
            ];
          }),
          catchError((error) => {
            this.toastService.presentToastError();
            return of(
              fromReprocessingActions.reprocessigFinish(),
              fromReprocessingActions.reprocessingFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  reprocessingSucces = createEffect(() =>
    this.action$.pipe(
      ofType(fromReprocessingActions.reprocessingSucces),
      exhaustMap(() =>
        from(this.router.navigate(["/process/process-detail"])).pipe(
          switchMap((result) =>
            result
              ? [fromReprocessingActions.reprocessigFinish()]
              : [
                  fromReprocessingActions.reprocessingFailure({
                    error: "No Autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}
