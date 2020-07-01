import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { TenderizedService } from "src/app/shared/services/process-tenderized.service";
import * as fromTenderizedActions from "./tenderized.actions";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";

@Injectable()
export class TenderizedEffects {
  constructor(
    private action$: Actions,
    private tenderizedService: TenderizedService,
    private toast: ToastService,
    private router: Router
  ) {}

  loadDataTenderized = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedSearchInformation),
      exhaustMap((action) =>
        this.tenderizedService.getDataTenderized(action.processId).pipe(
          switchMap((tenderized) =>
            Object.keys(tenderized).length > 0
              ? [
                  fromTenderizedActions.tenderizedLoadData({ tenderized }),
                  fromTenderizedActions.tenderizedIsSelected({
                    isSelected: true,
                  }),
                ]
              : [fromTenderizedActions.tenderizedLoadData({ tenderized: null })]
          ),
          catchError((error) => {
            return of(
              fromTenderizedActions.tenderizedRegisterFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerTenderized = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedRegister),
      exhaustMap((tenderized) =>
        this.tenderizedService
          .registerTenderized(tenderized, +localStorage.getItem("processId"))
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromTenderizedActions.tenderizedRegisterResults({
                  result: true,
                }),
                fromTenderizedActions.tenderizedRegisterFinish(),
                fromTenderizedActions.tenderizedRegisterSuccess(),
              ];
            }),
            catchError((error) => {
              this.toast.presentToastError();
              fromTenderizedActions.tenderizedRegisterResults({
                result: false,
              });
              return of(
                fromTenderizedActions.tenderizedRegisterFailure({
                  error: error.error.msg,
                }),
                fromTenderizedActions.tenderizedRegisterFinish()
              );
            })
          )
      )
    )
  );

  registerTenderizedSucces = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedRegisterSuccess),
      exhaustMap(() =>
        from(this.router.navigate(["/process/process-detail"])).pipe(
          switchMap((result) =>
            result
              ? [fromTenderizedActions.tenderizedRegisterFinish()]
              : [
                  fromTenderizedActions.tenderizedRegisterFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}
