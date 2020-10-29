import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ReprocesingToSet, ReprocessingOfProcess } from 'src/app/shared/models/reprocessing.interface';
import { AppState } from 'src/app/shared/models/store.state.interface';
import { AlertService } from 'src/app/shared/services/alert.service';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { getGrindingProcessMetadata } from '../../store/grinding/grinding.actions';
import { SELECT_GRINDING_PROCESS_METADATA } from '../../store/grinding/grinding.selector';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { getLotsReprocesingOfProcess, loadLotsOfReprocesing, vinculateReprocesingToProcess } from '../../store/reprocesing-grinding/reprocesing-grinding.actions';
import { reprocesingGrindingReducer } from '../../store/reprocesing-grinding/reprocesing-grinding.reducer';
import { SELECT_ALL_REPROCESINGS, SELECT_REPROCESINGS_OF_PROCESS, SELECT_REPROCESINGS_OF_PROCESS_ERROR, SELECT_REPROCESINGS_OF_PROCESS_LOADING } from '../../store/reprocesing-grinding/reprocesing-grinding.selectors';

@Component({
  selector: 'app-reprocesing-grinding-form',
  templateUrl: './reprocesing-grinding-form.component.html',
  styleUrls: ['./reprocesing-grinding-form.component.scss'],
})
export class ReprocesingGrindingFormComponent implements OnInit,OnDestroy {

  constructor(private store:Store<AppState>,private fb: FormBuilder,private alert:AlertService) { 
    this.form=fb.group({
      reprocesingId: ["", Validators.required]
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  subscriptions:Subscription;
  currentProcess:ProcessMetadata=null;
  displayedColumns:string[] = ["Lote","Materia Prima","Peso","Fecha"];
  reprocesingsToSet:ReprocesingToSet[] = [];
  matTableDataSource:MatTableDataSource<ReprocesingToSet>;
  reprocesingsToTake:ReprocessingOfProcess[]=[];
  reprocesingsToTakeTemp:ReprocessingOfProcess[]=[];
  form:FormGroup;
  isLoading:boolean=false;
  error:any=null;
  alreadyRegistered:boolean = false;
  registerSuccess:boolean = false;
  ngOnInit() {
    
    this.matTableDataSource = new MatTableDataSource();
    this.resetTable();
    this.subscriptions = new Subscription();
    this.store.dispatch(getGrindingProcessMetadata());
    this.store.dispatch(getLotsReprocesingOfProcess());
    this.subscriptions.add(this.store.select(SELECT_GRINDING_PROCESS_METADATA).subscribe((processMetadata)=>{
      if(processMetadata!=null){
        this.currentProcess=processMetadata;
        this.loadFormulation(this.currentProcess.formulationId);
        this.loadLotsOfReprocesing();
      }
    }));
this.subscriptions.add(this.store.select(SELECT_REPROCESINGS_OF_PROCESS_ERROR).subscribe((error)=>{
  this.error=error;
}))
this.subscriptions.add(this.store.select(SELECT_REPROCESINGS_OF_PROCESS_LOADING).subscribe((isLoading)=>{
  if(this.isLoading==true && isLoading==false){
    if(this.error==null){ 
      this.alreadyRegistered=true;
      this.registerSuccess=true;
    }else{
      this.registerSuccess=false;
    }
  }else{
    this.isLoading=isLoading;
  }
}))

    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
        console.log("Details",details);
    }));

    this.subscriptions.add(this.store.select(SELECT_ALL_REPROCESINGS).subscribe((reprocesings)=>{
        console.log("REPROCESOS DISPONIBLES",reprocesings);
        this.reprocesingsToTake=reprocesings;
        this.reprocesingsToTakeTemp=reprocesings;
        this.resetTable();
    })); 
    this.subscriptions.add(this.store.select(SELECT_REPROCESINGS_OF_PROCESS).subscribe((reprocesingsOfProcess)=>{
        if(reprocesingsOfProcess.length){
            this.alreadyRegistered=true;
            this.reprocesingsToSet=reprocesingsOfProcess.map((x)=>{
              return {
                date: x.date,
                lotId: x.lotId,
                rawMaterial: x.productName,
                reprocesingId: x.reprocesingId,
                weight: x.weight
              }
            });
            this.resetTable();
        }
    }))
  }

  resetTable(){
    this.matTableDataSource.data = this.reprocesingsToSet;
  }

  loadFormulation(formulationId:number){
    this.store.dispatch(
      getFormulationDetails({formulationId:formulationId})
    );
  }

  loadLotsOfReprocesing(){
    this.store.dispatch(
      loadLotsOfReprocesing()
    );
  }

  onSubmit(){
    if(!this.alreadyRegistered){
      this.store.dispatch(
      vinculateReprocesingToProcess({reprocesings:this.reprocesingsToSet.map(x=>x.reprocesingId)})
      );
    }
  }

  get reprocesingId(){
    return this.form.get("reprocesingId");
  }

  addItem(){
    if(this.form.valid){
      if(this.reprocesingsToSet.length<=10){
      let reprocesingId:number = this.reprocesingId.value;
      let reprocesing = this.reprocesingsToTake.filter(x=>x.reprocesingId==reprocesingId);
      this.reprocesingsToTakeTemp = this.reprocesingsToTake.filter(x=>x.reprocesingId!=reprocesingId);
      this.reprocesingsToSet.push({
        date: reprocesing[0].date,
        lotId: reprocesing[0].lotId,
        reprocesingId: reprocesing[0].reprocesingId,
        weight: reprocesing[0].weight,
        rawMaterial: reprocesing[0].productName
      });
      this.form.reset();
      this.resetTable();
      }else{
        this.alert.showAlert(
          "Informacion",
          `Limite alcanzado`,
          "Solo se pueden mezclar 10 lotes de reproceso",
          ["Aceptar"]
        );
      }
    }
  }

  removeItem(index:number){
      this.reprocesingsToSet.splice(index,1);
      let alreadyIntable = this.reprocesingsToSet.map(x=>x.reprocesingId);
      this.reprocesingsToTakeTemp = this.reprocesingsToTake.filter(x=>!alreadyIntable.includes(x.reprocesingId));
      this.resetTable();
  }

}
