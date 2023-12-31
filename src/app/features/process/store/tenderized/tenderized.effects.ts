import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { AlertService } from "src/app/shared/services/alert.service";
import { TenderizedService } from "src/app/shared/services/process-tenderized.service";
import * as fromTenderizedActions from "./tenderized.actions";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { SELECT_RECENT_RECORDS_PATH } from "../recent-records/recent-records.selector";
import { getFormulationsByProductRovianda, setFormulationsByProductRovianda } from './tenderized.actions';
import { FormulationService } from 'src/app/shared/services/formulation.service';
import { setProcessDetails } from '../process-detail/process-detail.actions';
import { ProcessService } from 'src/app/shared/services/process.service';
import { setFormulationDetails } from '../formulation/formulation.actions';

@Injectable()
export class TenderizedEffects {
  path: string;
  constructor(
    private action$: Actions,
    private tenderizedService: TenderizedService,
    private formulationService:FormulationService,
    private toast: ToastService,
    private router: Router,
    private _store: Store<AppState>,
    private processService:ProcessService
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

  gettingFormulationsByProductRovianda = createEffect(()=>
    this.action$.pipe(
      ofType(getFormulationsByProductRovianda),
      exhaustMap((action)=>
        this.formulationService.getFormulationsByProductRoviandaId(action.productRoviandaId).pipe(
          switchMap((formulations)=>{
            if(!formulations.length){
              this.toast.presentToastMessageWarning("No existen formulaciones pendientes para este tipo de producto");
            }
          return [setFormulationsByProductRovianda({formulations})]
          }),
          catchError(()=>[])
        )
      )
    )
  )

  loadDataTenderized = createEffect(() =>
    this.action$.pipe(
      ofType(fromTenderizedActions.tenderizedSearchInformation),
      exhaustMap((action) =>
        this.tenderizedService.getDataTenderized(action.processId).pipe(
          switchMap((tenderizeds) =>
            tenderizeds.length > 0
              ? [
                  fromTenderizedActions.tenderizedLoadData({ tenderizeds }),
                  fromTenderizedActions.tenderizedIsSelected({
                    isSelected: true,
                  }),
                ]
              : [fromTenderizedActions.tenderizedLoadData({ tenderizeds: [] })]
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
      exhaustMap((action) =>
        this.tenderizedService
          .registerTenderized(action.tenderizedItems, action.formulationId)
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                fromTenderizedActions.tenderizedRegisterResults({
                  result: true,
                }),
                setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}),
                fromTenderizedActions.setTenderizedProcessMetadata({process:null}),
                fromTenderizedActions.tenderizedRegisterFinish(),
                fromTenderizedActions.tenderizedRegisterSuccess(),
                setProcessDetails({process:null})
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
        from(this.router.navigate([this.path])).pipe(
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

  getTenderizedProcessMetadata$ = createEffect(()=>this.action$.pipe(
    ofType(fromTenderizedActions.getTenderizedProcessMetadata),
    exhaustMap((action)=>this.processService.getProcessDetails(+localStorage.getItem("processId")).pipe(
      switchMap((process)=>[fromTenderizedActions.setTenderizedProcessMetadata({process})]),
      catchError(()=>[fromTenderizedActions.setTenderizedProcessMetadata({process:null})])
    ))
  )
  )
}
