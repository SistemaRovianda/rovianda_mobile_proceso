import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromReprocessingActions from "./reprocessing.action";
import { ReprocessingService } from "src/app/shared/services/reprocessing.service";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { ToastService } from "src/app/shared/services/toast.service";
import { of, from } from "rxjs";
import { createAction } from "@ngrx/store";
import { Router } from "@angular/router";
import { FormulationService } from 'src/app/shared/services/formulation.service';
@Injectable()
export class ReprocessingEffects {
  constructor(
    private action$: Actions,
    private reprocessingService: ReprocessingService,
    private toastService: ToastService,
    private router: Router,
    private formulationService:FormulationService
  ) {}

 

  saveReprocesings = createEffect(() =>
    this.action$.pipe(
      ofType(fromReprocessingActions.registerReprocesings),
      exhaustMap((action) =>
        this.reprocessingService.registerReprocessing(action.reprocesings).pipe(
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
        from(this.router.navigate(["/process/sausage"])).pipe(
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

  getFormulationDetails$ = createEffect(()=>this.action$.pipe(
    ofType(fromReprocessingActions.getFormulationDetails),
    exhaustMap((action)=>this.formulationService.getFormulationsDetails(action.formulationId).pipe(
      switchMap((formulationDetails)=>[fromReprocessingActions.setFormulationDetails({formulationDetails})]),
      catchError(()=>[])
    ))
  ))

  getReprocesingOfProcess$ = createEffect(()=>this.action$.pipe(
    ofType(fromReprocessingActions.getReprocesingOfProcess),
    exhaustMap((action)=>this.reprocessingService.getListReprocessing(+localStorage.getItem("processId")).pipe(
      switchMap((reprocesings)=>[fromReprocessingActions.setReprocesingOfProcess({reprocesings})]),
      catchError(()=>[])
    ))
  ))
}
