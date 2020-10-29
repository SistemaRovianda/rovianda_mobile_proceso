import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { ReprocessingService } from "src/app/shared/services/reprocessing.service";

import { ToastService } from "src/app/shared/services/toast.service";
import { getLotsReprocesingOfProcess, loadLotsOfReprocesing,setLotsOfReprocesing, setLotsReprocesingOfProcess, vinculateReprocesingToProcess, vinculateReprocesingToProcessError, vinculateReprocesingToProcessSuccess } from './reprocesing-grinding.actions';

@Injectable()
export class ReprocessingGrindingEffects {
  constructor(
    private action$: Actions,
    private reprocessingService: ReprocessingService,
    private toastService: ToastService
  ) {}

  loadLotsOfReprocesing$ = createEffect(()=>this.action$.pipe(
      ofType(loadLotsOfReprocesing),
      exhaustMap((action)=>this.reprocessingService.getListAllReprocesings().pipe(
          switchMap((lotsReprocesing)=>{
            if(lotsReprocesing.length){
                this.toastService.presentToastSuccessCustom("Lotes Obtenidos");
            }
            return [setLotsOfReprocesing({lotsReprocesing})]
          }),
          catchError(()=>[])
      ))
  ));

  getLotsReprocesingOfProcess$ = createEffect(()=>this.action$.pipe(
    ofType(getLotsReprocesingOfProcess),
    exhaustMap((action)=>this.reprocessingService.getListReprocesingsVinculatedProcess(+localStorage.getItem("processId")).pipe(
      switchMap((reprocesings)=>[setLotsReprocesingOfProcess({reprocesings})]),
      catchError(()=>[setLotsReprocesingOfProcess({reprocesings:[]})])
    ))
  ))

  vinculateReprocesingToProcess$ = createEffect(()=>this.action$.pipe(
    ofType(vinculateReprocesingToProcess),
    exhaustMap((action)=>this.reprocessingService.setListReprocesingVinculatedProcess(+localStorage.getItem("processId"),action.reprocesings).pipe(
      exhaustMap(()=>{
        this.toastService.presentToastSuccess();
      return [vinculateReprocesingToProcessSuccess()]
      }
      ),
      catchError((error)=>{
        this.toastService.presentToastError();
        return [vinculateReprocesingToProcessError({error})]})
    ))
  ))
}
