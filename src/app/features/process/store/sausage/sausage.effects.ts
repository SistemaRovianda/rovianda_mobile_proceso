import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, switchMap, catchError } from "rxjs/operators";
import { throwError, of, from } from "rxjs";
import { SausageService } from "src/app/shared/services/process-sausage.service";
import * as fromSausageActions from "./sausage.actions";
import { ToastService } from "src/app/shared/services/toast.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { SELECT_RECENT_RECORDS_PATH } from "../recent-records/recent-records.selector";
import { FormulationService } from 'src/app/shared/services/formulation.service';
import { setProcessDetails } from '../process-detail/process-detail.actions';
import { ProcessService } from 'src/app/shared/services/process.service';
import { setFormulationDetails } from '../formulation/formulation.actions';
import { getSausageProcessMetadata, sausageSearchInformation } from "./sausage.actions";

@Injectable()
export class SausageEffects {
  path: string;
  constructor(
    private action$: Actions,
    private sausageService: SausageService,
    private toast: ToastService,
    private router: Router,
    private _store: Store<AppState>,
    private formulationService:FormulationService,
    private processService:ProcessService
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

  getFormulationsByProductRovianda$ = createEffect(()=>
    this.action$.pipe(
      ofType(fromSausageActions.getFormulationsByProductRovianda),
      exhaustMap((action)=>this.formulationService.getFormulationsByProductRoviandaId(action.productRoviandaId).pipe(
        switchMap((formulations)=>[fromSausageActions.setFormulationsByProductRovianda({formulations})]),
        catchError(()=>[])
      ))
    )
  )

  loadDataSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageSearchInformation),
      exhaustMap((action) =>
        this.sausageService.getDataSausage(action.processId).pipe(
          switchMap((sausages) =>
            sausages.length > 0
              ? [
                  fromSausageActions.sausageLoadData({ sausages }),
                  fromSausageActions.sausageIsSelected({ isSelected: true }),
                ]
              : [fromSausageActions.sausageLoadData({ sausages: []})]
          ),
          catchError((error) => {
            return of(
              fromSausageActions.sausageRegisterFailure({
                error: error.error.msg,
              })
            );
          })
        )
      )
    )
  );

  registerSausage = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageRegister),
      exhaustMap((action) =>
        this.sausageService
          .registerSausage(action.sausages, action.formulationId)
          .pipe(
            switchMap((action) => {
              this.toast.presentToastSuccess();
              return [
                // fromSausageActions.sausageRegisterResults({
                //   result: true,
                // }),
                setFormulationDetails({formulation:{date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:[],id:null,status:null,reprocesings:[]}}),
                fromSausageActions.setSausageProcessMetadata({process:null})
                ,
                fromSausageActions.sausageFinish(),
                fromSausageActions.sausageRegisterSuccess(),
                setProcessDetails({process:null})
              ];
            }),
            catchError((error) => {
              this.toast.presentToastError();
              fromSausageActions.sausageRegisterResults({
                result: false,
              });
              return of(
                fromSausageActions.sausageRegisterFailure({
                  error: error.error.msg,
                }),
                fromSausageActions.sausageFinish()
              );
            })
          )
      )
    )
  );

  registerSausageSuccess = createEffect(() =>
    this.action$.pipe(
      ofType(fromSausageActions.sausageRegisterSuccess),
      switchMap(
        () =>
        from(this.router.navigate([this.path])).pipe(
          switchMap((result) =>

            result?
               [fromSausageActions.sausageFinish(),sausageSearchInformation({processId:+localStorage.getItem("processId")})]
              : [
                 fromSausageActions.sausageRegisterFailure({
                   error: "No autorizado",
                 }),
               ]
         )
        )
      )
    )
  );

  // regiterSausageHour = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(fromSausageActions.sausageStartRegisterDateAndWeigth),
  //     exhaustMap(({ hour, sausagedId }) =>
  //       this.sausageService.registerAnotherHour(hour, sausagedId).pipe(
  //         switchMap((action) => {
  //           this.toast.presentToastSuccess();
  //           return [
  //             fromSausageActions.sausageFinish(),
  //             fromSausageActions.sausageRegisterSuccess(),
  //           ];
  //         }),
  //         catchError((error) => {
  //           this.toast.presentToastError();
  //           fromSausageActions.sausageRegisterResults({
  //             result: false,
  //           });
  //           return of(
  //             fromSausageActions.sausageRegisterFailure({
  //               error: error.error.msg,
  //             }),
  //             fromSausageActions.sausageFinish()
  //           );
  //         })
  //       )
  //     )
  //   )
  // );

  getSausageProcessMetadata$=createEffect(()=>this.action$.pipe(
    ofType(fromSausageActions.getSausageProcessMetadata),
    exhaustMap((action)=>this.processService.getProcessDetails(+localStorage.getItem("processId")).pipe(
      exhaustMap((process)=>[fromSausageActions.setSausageProcessMetadata({process})]),
      catchError(()=>[fromSausageActions.setSausageProcessMetadata({process:null})])
    ))
  ))

  updateHoursSausage$ = createEffect(()=>this.action$.pipe(
    ofType(fromSausageActions.updateSausageHour),
    exhaustMap((action)=>this.sausageService.registerAnotherHour(action.sausageId,action.sausageHours).pipe(
      switchMap(()=>{
        this.toast.presentToastSuccessCustom("Se actualizo la hora y peso sin problemas");
        return [fromSausageActions.updateSuccessSausageHour()]}),
      catchError(()=>{
        this.toast.presentToastMessageWarning("Ocurrio un error al actualizar la hora y peso");
        return [fromSausageActions.updateErrorSausageHour({error:"Error al actualizar"})]})
    ))
  ))
}
