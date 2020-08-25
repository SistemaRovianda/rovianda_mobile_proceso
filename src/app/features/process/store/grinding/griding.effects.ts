import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GrindingService } from "src/app/shared/services/process-grinding.service";
import { AlertService } from "src/app/shared/services/alert.service";
import * as fromGrindingActions from "./grinding.actions";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, from, of } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "src/app/shared/services/toast.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { SELECT_RECENT_RECORDS_PATH } from "../recent-records/recent-records.selector";

@Injectable()
export class GrindingEffects {
  path: string;
  constructor(
    private action$: Actions,
    private grindingService: GrindingService,
    private router: Router,
    private toast: ToastService,
    private _store: Store<AppState>
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

  loadDataGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingSearchInformation),
      exhaustMap((action) =>
        this.grindingService.getDataGrinding(action.processId).pipe(
          switchMap((grinding) =>
            Object.keys(grinding).length > 0
              ? [
                  fromGrindingActions.grindingLoadData({ grinding }),
                  fromGrindingActions.grindingIsSelected({ isSelected: true }),
                ]
              : [
                  fromGrindingActions.grindingLoadData({ grinding: null }),
                  fromGrindingActions.grindingIsSelected({ isSelected: false }),
                ]
          ),
          catchError((error) => {
            return of(
              fromGrindingActions.grindingRegisterFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingRegister),
      exhaustMap((grinding) =>
        this.grindingService
          .registerGrinding(grinding, +localStorage.getItem("processId"))
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromGrindingActions.grindingRegisterResult({ result: true }),
                fromGrindingActions.grindingRegisterSuccess(),
                fromGrindingActions.grindingRegisterFinish(),
              ];
            }),
            catchError((error) => {
              this.toast.presentToastError();
              fromGrindingActions.grindingRegisterResult({ result: false });
              return of(
                fromGrindingActions.grindingRegisterFailure({
                  error: error.error.msg,
                }),
                fromGrindingActions.grindingRegisterFinish()
              );
            })
          )
      )
    )
  );

  registerGridingSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingRegisterSuccess),
      exhaustMap(() =>
        from(this.router.navigate([this.path])).pipe(
          switchMap((result) =>
            result
              ? [fromGrindingActions.grindingRegisterFinish()]
              : [
                  fromGrindingActions.grindingRegisterFailure({
                    error: "No autorizado",
                  }),
                ]
          )
        )
      )
    )
  );
}
