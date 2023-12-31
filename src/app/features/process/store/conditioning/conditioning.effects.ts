import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ConditioningService } from "src/app/shared/services/process-conditioning.service";
import * as fromConditioningActions from "./conditioning.actions";
import { exhaustMap, switchMap, catchError, tap } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { SELECT_RECENT_RECORDS_PATH } from "../recent-records/recent-records.selector";
import { conditioningRegisterSuccess, getConditioningProcessMetadata, getFormulationsByProductRovianda, registerConditioning } from './conditioning.actions';
import { FormulationService } from 'src/app/shared/services/formulation.service';
import { setProcessDetails } from '../process-detail/process-detail.actions';
import { ProcessService } from 'src/app/shared/services/process.service';
import { setFormulationDetails } from '../formulation/formulation.actions';

@Injectable()
export class ConditioningEffects {
  path: string;
  constructor(
    private action$: Actions,
    private formulationService: FormulationService,
    private conditioningService:ConditioningService,
    private toast: ToastService,
    private router: Router,
    private _store: Store<AppState>,
    private processService: ProcessService
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
          switchMap((conditionings) =>
            
               [
                  fromConditioningActions.conditioningLoadData({
                    conditionings,
                  }),
                  fromConditioningActions.conditioningIsSelected({
                    isSelected: true,
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
            [conditioning],
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

  getFormulationsByProductRovianda$= createEffect(()=>
      this.action$.pipe(
        ofType(getFormulationsByProductRovianda),
        exhaustMap((action)=>this.formulationService.getFormulationsByProductRoviandaId(action.productRoviandaId).pipe(
          switchMap((formulations)=>{
            if(!formulations.length){
                this.toast.presentToastMessageWarning("No existen formulaciones para este producto")
            }
           return [fromConditioningActions.setFormulationsByProductRovianda({formulations})]
          })
        ))
      )
  )

  registeringNewConditioning = createEffect(()=>
    this.action$.pipe(
      ofType(registerConditioning),
      exhaustMap((action)=>this.conditioningService.registerConditioning(action.conditioning,action.formulationId).pipe(
        switchMap(()=>{
          return [conditioningRegisterSuccess(),setProcessDetails({process:null}),
            setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}),
            fromConditioningActions.setConditioningProcessMetadata({process:null})];
        }
      )))
    ))


    getConditioningProcessDetails$ = createEffect(()=>
        this.action$.pipe(
          ofType(getConditioningProcessMetadata),
          exhaustMap((action)=>this.processService.getProcessDetails(+localStorage.getItem("processId")).pipe(
            switchMap((details)=>[fromConditioningActions.setConditioningProcessMetadata({process:details})]),
            catchError(()=>[fromConditioningActions.setConditioningProcessMetadata({process:null})])
          )))
        )
    
}
