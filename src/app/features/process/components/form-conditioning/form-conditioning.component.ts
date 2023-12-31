import { Component, OnInit, Output, EventEmitter, Input, SimpleChange, SimpleChanges, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Conditioning, ConditioningOfProcess } from "src/app/shared/models/conditioning.interface";
import {
  SELECT_CONDITIONING_DATA,
  SELECT_CONDITIONING_FORMULATIONS,
  SELECT_CONDITIONING_IS_LOADING,
  SELECT_CONDITIONING_IS_SELECTED,
  SELECT_CONDITIONING_PROCESS_METADATA,
} from "../../store/conditioning/conditioning.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import { conditioningRegister, conditioningSearchInformation, getConditioningProcessMetadata, getFormulationsByProductRovianda, registerConditioning } from "../../store/conditioning/conditioning.actions";
import * as moment from "moment";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { SELECT_PROCESS_DETAIL_SECTION, SELECT_PROCESS_METADATA, SELECT_FORMULATIONS_PENDING, SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA } from "../../store/process-detail/process-detail.selector";
import { SELECT_BASIC_FORMULATIONS } from "../../store/basic-register/basic-register.select";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { LotMeatOutput } from 'src/app/shared/models/Lot-meat-output.interface';

import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Process } from 'src/app/shared/models/process.interface';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { FormulationDefrost, FormulationDetails, FormulationPending } from 'src/app/shared/models/formulations.interface';
import { getFormulationDetails, setFormulationDetails } from '../../store/formulation/formulation.actions';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { ConditioningItem } from 'src/app/shared/models/conditioning-page.interface';
import { Router } from '@angular/router';
import { from, Observable, of, Subject, Subscription } from 'rxjs';
import { ModalFormulationDetailsModule } from '../modal-formulation-details/modal-formulation-details.module';
import { SELECT_CURRENT_SECTION } from '../../store/sections/section.selector';



@Component({
  selector: "app-form-conditioning",
  templateUrl: "./form-conditioning.component.html",
  styleUrls: ["./form-conditioning.component.scss"],
})
export class FormConditioningComponent implements OnInit, OnDestroy{
  conditioning: Conditioning;

  form: FormGroup;

  

  productsRovianda$: Observable<ProductsRovianda[]>=from([[]]);

  @Output("onSubmit") submit = new EventEmitter();

  

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean=false;

  isNewRegister: boolean=true;

  section: string="CONDITIONING";

  formulations: Observable<FormulationPending[]>=from([[]]);
  conditioningsSaved:ConditioningOfProcess[]=[];
  processId:string;
  formulation:FormulationDetails={date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:null,id:null,status:null,reprocesings:[]}
  defrostOfFormulation:FormulationDefrost[]=[];
  conditioningArr:ConditioningItem[]=[];
  currentProcess:ProcessMetadata=null;
  matTableDataSource:MatTableDataSource<ConditioningItem>;
  displayedColumns:string[] = ["Lote","Materia Prima","Peso","Deshuesar","Limpieza","Curacion","Fecha"];
  modalOpened=false;

  private subscriptions=new Subscription();
  public ngOnDestroy():void{
    this.subscriptions.unsubscribe();
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService,
    private dialog:MatDialog,
    private route:Router
  ) {
    this.form = fb.group({
      productRovianda: ["", Validators.required],
      bone: [false, Validators.required],
      clean: [false, Validators.required],
      healthing: [false, Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      temperature: ["", Validators.required],
      date: ["", Validators.required],
      formulationId: [0,Validators.required],
      defrostId:["",[Validators.required]]
    });

    this.matTableDataSource = new MatTableDataSource();
    this.matTableDataSource.data = this.conditioningArr;
    
    this.subscriptions.add(this.store.select(SELECT_CONDITIONING_DATA).subscribe((conditionings)=>{
      if(conditionings.length){
      this.conditioningsSaved = conditionings;
      this.conditioningArr=conditionings.map((x)=>{
        return {
          bone:x.bone,
          clean:x.clean,
          date:x.date,
          defrostId:0,
          healthing: x.healthing,
          lotId: x.lotId,
          temperature: x.temperature,
          weight: x.weight,
          rawMaterial: x.rawMaterial
        }
      });
      this.resetTable();
      }else{
        if(localStorage.getItem("processId")!="-1"){
        this.store.dispatch(getConditioningProcessMetadata());
        }
        this.subscriptions.add(this.store.select(SELECT_CONDITIONING_PROCESS_METADATA).subscribe((processMetadata)=>{
          if(processMetadata!=null){
            this.currentProcess = processMetadata;
            console.log("CURRENT PROCESS",this.currentProcess);
            if(!processMetadata.conditioning){
              this.formulationId.setValue(processMetadata.formulationId);
              this.selectFormulationId();
            }
            this.productRovianda.setValue(0)
          }
        }));
      }
    }));
    this.subscriptions.add(this.store.select(SELECT_CURRENT_SECTION).subscribe((section)=>{
      this.section=section;
    }));
    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.defrostOfFormulation=this.formulation.defrosts;
      this.conditioningArr=[];
      console.log("Obteniendo detalless");
      if(details.id!=null && this.isNewRegister && this.section=="CONDITIONING" && this.modalOpened==false){
        this.modalOpened=true;
        this.dialog.open(ModalFormulationDetailsComponent, {
          width: '500px',
          data: this.formulation,
          panelClass: "backdropBackground"
        }).afterClosed().subscribe(()=>this.modalOpened=false);
        
      }
    }));
    
    
    this.subscriptions.add(this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      if(!isNewRegister){
        this.isNewRegister = isNewRegister;
        console.log("Busncando conditionings");
        this.store.dispatch(conditioningSearchInformation({processId:+localStorage.getItem("processId")}));
      }else{
        this.productsRovianda$=this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
        this.formulations=this.store.select(SELECT_CONDITIONING_FORMULATIONS);
      }
    }));
  }

  isLoading=false;
  ngOnInit() {
   
    
   
  }

  onSubmit() {
    console.log("isNew",this.isNewRegister);
    if(this.isNewRegister || (!this.isNewRegister && this.currentProcess!=null && !this.conditioningsSaved.length)){
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
           this.store.dispatch(registerConditioning({formulationId:this.formulationId.value,conditioning:this.conditioningArr}))
        },
      },
    ];
    if (this.conditioningArr.length) {
      this.alert.showAlert(
        "Informacion",
        `${
          this.isNewRegister
            ? "Para registrar esta sección se creará un nuevo proceso"
            : ""
        }`,
        "Una vez guardada la información no podrá ser modificada, ¿Deseas guardar la información?",
        buttons
      );
    }
  }
  }

  registerConditioning() {
    console.log("Registering conditioning");
    const { date, ...values } = this.form.value;

    this.store.dispatch(
      conditioningRegister({
        ...values,
        date: moment(date).format("YYYY-MM-DD"),
      })
    );
  }



  get bone() {
    return this.form.get("bone");
  }

  get clean() {
    return this.form.get("clean");
  }
  get healthing() {
    return this.form.get("healthing");
  }

  get isRequiredOnly() {
    return this.bone.value || this.clean.value || this.healthing.value;
  }

  get productRovianda() {
    return this.form.get("productRovianda");
  }

  get lotId() {
    return this.form.get("lotId");
  }

  get formulationId(){
    return this.form.get("formulationId");
  }

  get defrostId(){
    return this.form.get('defrostId');
  }

  selectFormulationId(){ // una vez seleccionado la formulacion, se obtienen los lotes de carne de esa formulacion para su tratamiento individual
    console.log("llamando");
    if(this.formulationId.value!=null){
    this.store.dispatch(
      getFormulationDetails({formulationId:this.formulationId.value})
    );
    }
  }

  selectProductRovianda() { // al seleccionar el producto de rovianda se buscan todos las formulaciones de ese mismo producto
    console.log("se selecciono un producto de rovianda",this.productRovianda.value);
    if(this.productRovianda.value!=0 && this.productRovianda.value!=null){
      this.store.dispatch(
        getFormulationsByProductRovianda({
          productRoviandaId: this.productRovianda.value,
        })
      );
    }
  }

  addItem(){ // metod que busca que el lote de enfriamiento no este ya en los registros de condicionamiento a guardar, en caso de no estarlo, procede a guardarlo
    console.log(this.form.valid,this.form.value);
    if(this.form.valid){

        let has=this.conditioningArr.filter(x=>x.defrostId==this.form.get('defrostId').value);
        if(!has.length){
          this.defrostOfFormulation=this.defrostOfFormulation.filter(x=>x.defrostFormulationId!=this.form.get('defrostId').value);
          console.log("agregando");
          let lotString = "";
          let rawMaterial ="";
          console.log("defrostId",this.defrostId.value);
          for(let defrost of this.formulation.defrosts){
            console.log(defrost);
            if(defrost.defrostFormulationId==+this.defrostId.value){
              lotString=defrost.lotMeat;
              rawMaterial=defrost.defrost.outputCooling.rawMaterial.rawMaterial;
              console.log("coincide");
            }else{
              console.log("no coincide");
            }
          }
          
          let conditioningItemToAdd:ConditioningItem={
            bone: this.bone.value,
            clean: this.clean.value,
            date: this.form.get('date').value,
            defrostId: this.defrostId.value,
            healthing: this.healthing.value,
            temperature: this.form.get('temperature').value,
            weight: this.form.get('weight').value,
            lotId: lotString,
            rawMaterial
          };
          this.bone.setValue(false);
          this.clean.setValue(false);
          this.form.get('date').reset();
          this.healthing.setValue(false);
          this.form.get('weight').reset();
          this.form.get('temperature').reset();
          this.defrostId.reset();
          this.conditioningArr.push(conditioningItemToAdd);
          
          this.resetTable();
        }else{
          console.log("Ya esta");
        }
    }
  }

  removeOfConditioningArr(index:number){ // metodo que elimina los registros de lotes a condicionamiento
    this.conditioningArr.splice(index,1);
    this.defrostOfFormulation=this.formulation.defrosts.filter(x=>!this.conditioningArr.map(x=>x.defrostId).includes(x.defrostFormulationId));
    this.resetTable();
  }
  resetTable(){
    this.matTableDataSource.data = this.conditioningArr;
  }

  
  dateParseStr(date:string,hint:string){
    let dateSplited = date.split(hint);
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
}
