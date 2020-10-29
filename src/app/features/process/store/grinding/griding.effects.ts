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
import { FormulationService } from 'src/app/shared/services/formulation.service';
import { setProcessDetails } from '../process-detail/process-detail.actions';
import { ProcessService } from 'src/app/shared/services/process.service';
import { ReprocessingService } from 'src/app/shared/services/reprocessing.service';
import { getLotsReprocesingOfProcess } from '../reprocesing-grinding/reprocesing-grinding.actions';
import { setFormulationDetails } from '../formulation/formulation.actions';

@Injectable()
export class GrindingEffects {
  path: string;
  constructor(
    private action$: Actions,
    private grindingService: GrindingService,
    private router: Router,
    private toast: ToastService,
    private _store: Store<AppState>,
    private formulationService:FormulationService,
    private processService:ProcessService,
    private reprocesingService:ReprocessingService
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

  gettingFormulations = createEffect(()=>
    this.action$.pipe(
      ofType(fromGrindingActions.getFormulationsByProductRovianda),
      exhaustMap((action)=>this.formulationService.getFormulationsByProductRoviandaId(action.productRoviandaId).pipe(
        switchMap((formulations)=>
        {
          if(!formulations.length){
            this.toast.presentToastMessageWarning("No existen formulaciones para este producto")
          }
        return [fromGrindingActions.setFormulationsByProductRovianda({formulations})]
        }
        ),
        catchError(()=>[])
      ))
    )
  )

  loadDataGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingSearchInformation),
      exhaustMap((action) =>
        this.grindingService.getDataGrinding(action.processId).pipe(
          switchMap((grindings) =>
            grindings.length
              ? [
                  fromGrindingActions.grindingLoadData({ grindings }),
                  fromGrindingActions.grindingIsSelected({ isSelected: true }),
                ]
              : [
                  fromGrindingActions.grindingLoadData({ grindings: [] }),
                  fromGrindingActions.grindingIsSelected({ isSelected: false }),
                ]
          ),
          catchError((error) => {
            return [
              fromGrindingActions.grindingRegisterFailure({
                error: error.error.msg,
              }),fromGrindingActions.grindingLoadData({grindings:[]})
            ]
          })
        )
      )
    )
  );

  registerGrinding = createEffect(() =>
    this.action$.pipe(
      ofType(fromGrindingActions.grindingRegister),
      exhaustMap((action) =>
        this.grindingService
          .registerGrinding(action.grindings, action.formulationId)
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromGrindingActions.grindingRegisterResult({ result: true }),
                fromGrindingActions.grindingRegisterSuccess(),
                setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}),
                fromGrindingActions.setGrindingProcessMetadata({process:null}),
                fromGrindingActions.grindingRegisterFinish(),
                setProcessDetails({process:null})
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

  getGrindingProcessMetadata$ = createEffect(()=>
  this.action$.pipe(
    ofType(fromGrindingActions.getGrindingProcessMetadata),
    exhaustMap((action)=>this.processService.getProcessDetails(+localStorage.getItem("processId")).pipe(
      switchMap((process)=>[fromGrindingActions.setGrindingProcessMetadata({process})]),
      catchError(()=>[fromGrindingActions.setGrindingProcessMetadata({process:null})])
    ))
  ))

  setReprocesingLots$ = createEffect(()=>this.action$.pipe(
    ofType(fromGrindingActions.setReprocesingLots),
    exhaustMap((action)=>this.reprocesingService.setGrindingReprocesing(action.reprocesings).pipe(
      switchMap(()=>
      {
        this.toast.presentToastSuccessCustom("Lotes de reproceso registrados correctamente");
        return [getLotsReprocesingOfProcess()]
      }),
      catchError(()=>
      {
        this.toast.presentToastMessageWarning("Error lotes de reproceso no registrados")
        return []
      })
    ))
  ))
}
