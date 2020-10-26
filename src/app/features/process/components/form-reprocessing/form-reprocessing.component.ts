import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";

import { SELECT_RECENT_RECORDS_PROCESS_SELECTED } from "../../store/recent-records/recent-records.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { SELECT_PROCESS_METADATA } from '../../store/process-detail/process-detail.selector';
import { getFormulationDetails, getReprocesingOfProcess, registerReprocesings } from '../../store/reprocessing/reprocessing.action';
import { SELECT_FORMULATION_DETAILS, SELECT_REPROCESSING_LIST_REPROCESSIG } from '../../store/reprocessing/reprocessing.selector';
import { FormulationDefrost } from 'src/app/shared/models/process-reprocessing.interface';
import { ReprocessingOfProcess } from 'src/app/shared/models/reprocessing.interface';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-form-reprocessing",
  templateUrl: "./form-reprocessing.component.html",
  styleUrls: ["./form-reprocessing.component.scss"],
})
export class FormReprocessingComponent implements OnInit,OnDestroy {
  listReprocessing: ReprocessingOfProcess[] = [];
  @Output("onSubmit") submit = new EventEmitter();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      date: [new Date().toISOString(), Validators.required],
      allergens: ["", Validators.required],
      defrostId: ["", Validators.required],
      weight: ["", Validators.required],
    });
  }
  private subcriptions:Subscription=new Subscription();
  ngOnDestroy(): void {
    this.subcriptions.unsubscribe();
  }
  alreadyRegistered:boolean=false;
  lotsOfFormulation:FormulationDefrost[]=[];
  lotsOfFormulationTemp:FormulationDefrost[]=[];
  reprocesingsOfProcess:ReprocessingOfProcess[]=[];
  matTableDataSource:MatTableDataSource<ReprocessingOfProcess>;
  displayedColumns:string[] = ["Lote","Materia Prima","Peso","Alerjeno","Fecha","Utilizado"];
  ngOnInit() {
    this.matTableDataSource = new MatTableDataSource();
    this.store.dispatch(getProcessDetails());
    this.store.dispatch(getReprocesingOfProcess());
    this.subcriptions.add(this.store.select(SELECT_PROCESS_METADATA).subscribe((processMetadata)=>{
      console.log("PROCESS METADATA",processMetadata);
      if(processMetadata!=null){
      this.getFormulationDetails(processMetadata.formulationId);
      }
    }))
    this.subcriptions.add(this.store.select(SELECT_FORMULATION_DETAILS).subscribe((formulationDetails)=>{
      if(formulationDetails!=null){
      console.log("Formulations",formulationDetails.defrosts);
      this.lotsOfFormulation=formulationDetails.defrosts.map((x)=>{
        return {
          defrostId: x.defrost.defrostId,
          lotMeat: x.lotMeat,
          rawMaterial: x.defrost.outputCooling.rawMaterial.rawMaterial
        }
      });
      this.lotsOfFormulationTemp = this.lotsOfFormulation;
      if(this.reprocesingsOfProcess.length){
        let reprocesingsAlreadyRegister = this.reprocesingsOfProcess.map(x=>x.defrostId);
        this.lotsOfFormulation = this.lotsOfFormulation.filter(x=>!reprocesingsAlreadyRegister.includes(x.defrostId));
      }
      }
    }));
    
    this.subcriptions.add(this.store.select(SELECT_REPROCESSING_LIST_REPROCESSIG).subscribe((reprocesings)=>{
      if(reprocesings.length){
        this.alreadyRegistered=true;
        this.reprocesingsOfProcess=[...reprocesings];
      }
        let reprocesingsAlreadyRegister = this.reprocesingsOfProcess.map(x=>x.defrostId);
        this.lotsOfFormulation = this.lotsOfFormulation.filter(x=>!reprocesingsAlreadyRegister.includes(x.defrostId));
        this.resetTable();
    }));
  }

  getFormulationDetails(formulationId:number){
    this.store.dispatch(
      getFormulationDetails({formulationId:formulationId})
    );
  }

  resetTable(){
    this.matTableDataSource.data = this.reprocesingsOfProcess;
  }

  onSubmit() {
    console.log(this.alreadyRegistered);
    if(!this.alreadyRegistered && this.reprocesingsOfProcess.length){
      this.store.dispatch(registerReprocesings({reprocesings:this.reprocesingsOfProcess}));  
    }
  }



  addItem(){
    console.log("Agregando item");
    let itemSelected = this.lotsOfFormulation.filter(x=>x.defrostId==this.defrostId.value);
    if(itemSelected.length && this.weight.valid && this.allergens.valid && this.defrostId.valid && this.date.valid){
      this.reprocesingsOfProcess.push({
        active:false,
        allergen:this.allergens.value,
        date: this.date.value,
        defrostId: this.defrostId.value,
        lotId: itemSelected[0].lotMeat,
        productName: itemSelected[0].rawMaterial,
        weight: this.weight.value
      });
      this.lotsOfFormulationTemp = this.lotsOfFormulation.filter(x=>x.defrostId!=itemSelected[0].defrostId);
      this.resetTable();
      this.defrostId.setValue(null);
      this.allergens.setValue(null);
      this.weight.setValue(null);
    };
    
  }

  removeItem(index:number){
    this.reprocesingsOfProcess.splice(index,1);
    let alreadyInTable =this.reprocesingsOfProcess.map(x=>x.defrostId);
    this.lotsOfFormulationTemp = this.lotsOfFormulation.filter(x=>!alreadyInTable.includes(x.defrostId))
    this.resetTable();
  }

  asignprocess() {
    const { loteReprocessing, loteProcess } = this.form.value;

    const payload = {
      loteProcess,
      reprocessingId: loteReprocessing.reprocessingId,
    };
    this.submit.emit(payload);
  }

  get defrostId() {
    return this.form.get("defrostId");
  }

  get date() {
    return this.form.get("date");
  }

  get weight(){
    return this.form.get("weight");
  }
  get allergens() {
    return this.form.get("allergens");
  }
 
}
