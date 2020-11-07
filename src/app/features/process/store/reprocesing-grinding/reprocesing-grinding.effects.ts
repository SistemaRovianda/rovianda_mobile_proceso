import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/shared/models/store.state.interface';
import { ReprocessingService } from "src/app/shared/services/reprocessing.service";

import { ToastService } from "src/app/shared/services/toast.service";
import { SELECT_RECENT_RECORDS_PATH } from '../recent-records/recent-records.selector';
import { getLotsReprocesingOfProcess, loadLotsOfReprocesing,setLotsOfReprocesing, setLotsReprocesingOfProcess, vinculateReprocesingToProcess, vinculateReprocesingToProcessError, vinculateReprocesingToProcessSuccess } from './reprocesing-grinding.actions';

@Injectable()
export class ReprocessingGrindingEffects {
  private path:string;
  constructor(
    private action$: Actions,
    private reprocessingService: ReprocessingService,
    private toastService: ToastService,
    private _store:Store<AppState>,
    private router:Router
  ) {
    this._store
      .select(SELECT_RECENT_RECORDS_PATH)
      .subscribe((pathTemp) => (this.path = pathTemp));
  }

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


  vinculateReprocesingToProcessSuccess$ = createEffect(()=>this.action$.pipe(
    ofType(vinculateReprocesingToProcessSuccess),
    exhaustMap(() => from(this.router.navigate([this.path])).pipe(
          switchMap((result) =>[])
    ))),{dispatch:false})
}
