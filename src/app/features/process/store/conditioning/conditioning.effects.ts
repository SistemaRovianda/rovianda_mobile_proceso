import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConditioningService } from "src/app/shared/services/process-conditioning.service";
import * as fromConditioningActions from "./conditioning.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { SELECT_RECENT_RECORDS_PATH } from "../recent-records/recent-records.selector";

@Injectable()
export class ConditioningEffects {
  path: string;
  constructor(
    private action$: Actions,
    private conditioningService: ConditioningService,
    private toast: ToastService,
    private router: Router,
    private _store: Store<AppState>
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

  loadDataConditioning = createEffect(() =>
    this.action$.pipe(
      ofType(fromConditioningActions.conditioningSearchInformation),
      exhaustMap((action) =>
        this.conditioningService.getDataConditioning(action.processId).pipe(
          switchMap((conditioning) =>
            Object.keys(conditioning).length > 0
              ? [
                  fromConditioningActions.conditioningLoadData({
                    conditioning,
                  }),
                  fromConditioningActions.conditioningIsSelected({
                    isSelected: true,
                  }),
                ]
              : [
                  fromConditioningActions.conditioningLoadData({
                    conditioning: null,
                  }),
                  fromConditioningActions.conditioningIsSelected({
                    isSelected: false,
                  }),
                ]
          ),
          catchError((error) => {
            return of(
              fromConditioningActions.conditioningRegisterFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerConditioning = createEffect(() =>
    this.action$.pipe(
      ofType(fromConditioningActions.conditioningRegister),
      exhaustMap((conditioning) =>
        this.conditioningService
          .registerConditioning(
            conditioning,
            +localStorage.getItem("processId")
          )
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromConditioningActions.conditioningRegisterResults({
                  result: true,
                }),
                fromConditioningActions.conditioningRegisterFinish(),
                fromConditioningActions.conditioningRegisterSuccess(),
              ];
            }),
            catchError((error) => {
              this.toast.presentToastError();
              fromConditioningActions.conditioningRegisterResults({
                result: false,
              });
              return of(
                fromConditioningActions.conditioningRegisterFailure({
                  error: error.error.msg,
                }),
                fromConditioningActions.conditioningRegisterFinish()
              );
            })
          )
      )
    )
  );

  registerConditioningSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(fromConditioningActions.conditioningRegisterSuccess),
      exhaustMap(() =>
        from(this.router.navigate([this.path])).pipe(
          switchMap((result) =>
            result
              ? [fromConditioningActions.conditioningRegisterFinish()]
              : [
                  fromConditioningActions.conditioningRegisterFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}
