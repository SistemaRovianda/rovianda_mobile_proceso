import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, switchMap } from 'rxjs/operators';
import { FormulationService } from 'src/app/shared/services/formulation.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { getFormulationDetails, setFormulationDetails } from './formulation.actions';

@Injectable()
export class FormulationEffects {
    
    constructor(private action$: Actions,private formulationService:FormulationService,
        private toast: ToastService){
        
    }


    getFormulationDetails$ = createEffect(()=>
    this.action$.pipe(
        ofType(getFormulationDetails),
        exhaustMap((action)=>this.formulationService.getFormulationsDetails(action.formulationId).pipe(
            switchMap((formulation)=>{
                this.toast.presentToastSuccessCustom("Obteniendo detalles de formulación")
                return[setFormulationDetails({formulation})]
            }),
            catchError(()=>{
                 this.toast.presentToastMessageWarning("No existen detalles")
                return []
            })
        ))
    )
    )

}