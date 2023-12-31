import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Grinding, GrindingItemToList, GrindingOfProcess } from "src/app/shared/models/grinding.interface";
import {
  SELECT_GRINDING_DATA,
  SELECT_GRINDING_FORMULATIONS,
  SELECT_GRINDING_PROCESS_METADATA,
  
} from "../../store/grinding/grinding.selector";
import { AlertService } from "src/app/shared/services/alert.service";

import { getFormulationsByProductRovianda, getGrindingProcessMetadata, grindingRegister, grindingSearchInformation, setReprocesingLots } from "../../store/grinding/grinding.actions";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
} from "../../store/recent-records/recent-records.selector";

import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";

import { SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA, SELECT_PROCESS_METADATA } from "../../store/process-detail/process-detail.selector";

//import { basicRegisterSelectMaterial } from '../../store/basic-register/basic-register.actions';

import { FormulationDefrost, FormulationDetails, FormulationPending } from 'src/app/shared/models/formulations.interface';
import { from, Observable, Subscription } from 'rxjs';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { ModalFormulationDetailsModule } from '../modal-formulation-details/modal-formulation-details.module';
import { SELECT_CURRENT_SECTION } from '../../store/sections/section.selector';
import { getLotsReprocesingOfProcess } from '../../store/reprocesing-grinding/reprocesing-grinding.actions';
import { SELECT_REPROCESINGS_OF_PROCESS } from '../../store/reprocesing-grinding/reprocesing-grinding.selectors';
import { reprocesingOfGrinding, ReprocessingOfProcess } from 'src/app/shared/models/reprocessing.interface';
//import { SELECT_BASIC_REGISTER_LOTS } from '../../store/basic-register/basic-register.select';

@Component({
  selector: "app-form-grinding",
  templateUrl: "./form-grinding.component.html",
  styleUrls: ["./form-grinding.component.scss"],
})
export class FormGrindingComponent implements OnInit,OnDestroy {
  grinding: Grinding;

  form: FormGroup;

  @Output("onSubmit") submit = new EventEmitter();

  
  isNewRegister: boolean=true;

  section: string;
  currentProcess:ProcessMetadata=null;

  productsRovianda$:Observable<ProductsRovianda[]> = from([[]]);
  formulations: Observable<FormulationPending[]>=from([[]]);
  formulation:FormulationDetails={
    date:null,defrosts:null,id:null,lotDay:null,make:null,productRovianda:null,status:null,temp:null,
    verifit:null,waterTemp:null,reprocesings:[]
  }
  defrostOfFormulation:FormulationDefrost[]=[];
  grindingArr:GrindingItemToList[]=[];
  grindingsOfProcess:GrindingOfProcess[]=[];
  matTableDataSource:MatTableDataSource<GrindingItemToList>;
  dialogRef:MatDialogRef<ModalFormulationDetailsComponent>;
  displayedColumns:string[] = ["Lote","Materia Prima","Peso","Proceso","Fecha","Temperatura","Tipo"];
  reprocesingsPendingTemp:ReprocessingOfProcess[]=[];
  reprocesingsPending:ReprocessingOfProcess[]=[];
  reprocesingsToRegister:reprocesingOfGrinding[]=[];
  private subscriptions=new Subscription();
  hasReprocesing:boolean = false;
  public ngOnDestroy():void{
    console.log("destruyendo");
    this.subscriptions.unsubscribe();
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      productRovianda: ["", Validators.required],
      formulationId: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      date: ["", Validators.required],
      defrostId: ["", [Validators.required]],
      process:["",[Validators.required]],
      reprocesingId:[""],
      temperature:["",Validators.required]
    });
    this.subscriptions.add(this.store.select(SELECT_CURRENT_SECTION).subscribe((section)=>{
      this.section=section;
    }));
    this.store.dispatch(getLotsReprocesingOfProcess());
    this.matTableDataSource = new MatTableDataSource();
    this.resetTable();
    this.subscriptions.add(this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      if(!isNewRegister){
        this.isNewRegister = isNewRegister;
        this.store.dispatch(grindingSearchInformation({processId:+localStorage.getItem("processId")}));
      }else{
        this.productsRovianda$=this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
        this.formulations = this.store.select(SELECT_GRINDING_FORMULATIONS);
      }
    }));
    this.subscriptions.add(this.store.select(SELECT_GRINDING_DATA).subscribe((grindings)=>{
      this.grindingsOfProcess=grindings;
      if(grindings.length){
        this.grindingArr= [...this.grindingsOfProcess.map((x)=>{
          return {
            date:x.date,
            defrostId:0,
            lotId:x.formulation,
            process: x.process,
            weight: x.weight,
            typeRecord: "NORMAL",
            reprocesingId:0,
            rawMaterial: x.rawMaterial,
            temperature: x.temperature
          }
        }),...this.grindingArr]
        this.resetTable();
      }else{
        
        this.store.dispatch(getGrindingProcessMetadata());
        
        this.subscriptions.add(this.store.select(SELECT_GRINDING_PROCESS_METADATA).subscribe((processMetadata)=>{
          if(processMetadata!=null){
            this.currentProcess = processMetadata;
            console.log("CURRENT PROCESS",this.currentProcess);
            this.formulationId.setValue(this.currentProcess.formulationId);
            if(!this.currentProcess.grinding){
            this.selectFormulationId()
          }
            
            this.productRovianda.setValue(0)
          }
        }));
      }
    }));
    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.defrostOfFormulation=this.formulation.defrosts;
      this.grindingArr=[];
      if(details.id!=null && this.isNewRegister && this.section=="GRINDING"){
        this.dialogRef = this.dialog.open(ModalFormulationDetailsComponent, {
          width: '500px',
          height:"50%",
          data: this.formulation,
          panelClass: "backdropBackground"
        });
        this.dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.dialogRef=null;
        });
      }
    }))
   
    this.subscriptions.add(this.store.select(SELECT_REPROCESINGS_OF_PROCESS).subscribe((reprocesings)=>{
      console.log("Reprocesos asignados",reprocesings);
      
      this.reprocesingsPending =reprocesings.filter(x=>x.used==false);
      this.reprocesingsPendingTemp=reprocesings.filter(x=>x.used==false);
      if(this.reprocesingsPending.length){
        this.hasReprocesing=true;  
      }else{
        this.hasReprocesing=false;
      }
      let reprocesingsUsed =reprocesings.filter(x=>x.used==true);
      let reprocesingsAlreadyInArray = this.grindingArr.map(x=>x.reprocesingId);
      reprocesingsUsed = reprocesingsUsed.filter(x=>!reprocesingsAlreadyInArray.includes(x.reprocesingId));
      if(reprocesingsUsed.length){
        console.log("REPROCESO UTILIZADO");
      
      this.grindingArr.push(...reprocesingsUsed.map((x)=>{
        return { 
          date: x.dateUsed,
          defrostId:0,
          lotId: x.lotId,
          process: x.process,
          weight: +x.weightUsed,
          typeRecord: "REPROCESO",
          reprocesingId: x.reprocesingId,
          rawMaterial: x.productName,
          temperature: +this.temperature.value
        }
      }));
      this.resetTable();
    }else{
      console.log("Todos los reprocesos usados");
    }
  }
    ));

  }

  resetTable(){
    this.matTableDataSource.data = this.grindingArr;
  }


  get productRovianda(){
    return this.form.get('productRovianda');
  }

  get formulationId(){
    return this.form.get('formulationId');
  }

  get defrostId(){
    return this.form.get('defrostId');
  }

  get date(){
    return this.form.get("date");
  }

  get weigth(){
    return this.form.get("weight");
  }

  get process(){
    return this.form.get("process");
  }

  get reprocesingId(){
    return this.form.get("reprocesingId");
  }

  get temperature(){
    return this.form.get('temperature');
  }
  selectFormulationId(){
    if(this.formulationId.value!=null){
    this.store.dispatch(
      getFormulationDetails({formulationId:this.formulationId.value})
    );
    }
  }

  ngOnInit() {
    console.log("Reloaded");
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cencelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
            
             this.registerGrinding()
 
        },
      },
    ];
    if (this.grindingArr.length && !this.hasReprocesing && !this.grindingsOfProcess.length) {
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
    }else if(this.hasReprocesing){
      if(this.reprocesingsToRegister.length && !this.reprocesingsPendingTemp.length){
        const buttons2: any = [
          {
            text: "Cencelar",
            role: "cancel",
          },
          {
            text: "Aceptar",
            handler: () => {
              this.store.dispatch(setReprocesingLots({reprocesings:this.reprocesingsToRegister}));
            },
          },
        ];
        this.alert.showAlert(
          "Informacion",
          `Registro de reproceso`,
          "Una vez guardada la información no podrá ser modificada, ¿Deseas guardar la información?",
          buttons2
        );
        
        }else if(this.reprocesingsPendingTemp.length){
          this.alert.showAlert(
            "Informacion",
            `Registros de reproceso pendientes`,
            "Aún no se han registrados todos los lotes de reproceso",
            ["Aceptar"]
          );
        }
    }
  }

  registerGrinding() {
    this.store.dispatch(
      grindingRegister({ formulationId:this.formulationId.value,grindings:this.grindingArr })
    );
  }
  selectProductRovianda(){
    if(this.productRovianda.value!=null && this.productRovianda.value!=0){
  this.store.dispatch(getFormulationsByProductRovianda({productRoviandaId:this.productRovianda.value}));
    }
  }
  updateForm() {
    const { ...values } = this.grinding;

    this.form.patchValue({ productId: this.grinding.nameProduct, ...values });
  }

  addItem(){
    console.log(this.form.valid,this.form.value);
    if(this.form.valid){
      if(!this.hasReprocesing){
        let has=this.grindingArr.filter(x=>x.defrostId==this.form.get('defrostId').value);
        if(!has.length){
          this.defrostOfFormulation=this.defrostOfFormulation.filter(x=>x.defrostFormulationId!=this.defrostId.value);
          console.log("agregando");
          let lotString = "";
          let rawMaterial="";
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
          let item:GrindingItemToList ={
            date: this.date.value,
            defrostId: this.defrostId.value,
            process: this.process.value,
            weight: this.weigth.value,
            lotId: lotString,
            typeRecord: "NORMAL",
            reprocesingId:0,
            rawMaterial,
            temperature: this.temperature.value
          }
          this.date.reset();
          this.process.reset();
          this.weigth.reset();
          this.grindingArr.push(item);
          this.temperature.reset();
          this.resetTable();
        }else{
          console.log("Ya esta");
        }
    }
  }else{
    if(this.date.valid && this.process.valid && this.weigth.valid && this.reprocesingId.value!="" && this.reprocesingsPendingTemp.length){
    let item= this.reprocesingsPendingTemp.filter(x=>x.reprocesingId==this.reprocesingId.value);
    this.reprocesingsPendingTemp= this.reprocesingsPendingTemp.filter(x=>x.reprocesingId!=this.reprocesingId.value);
    this.reprocesingsToRegister.push({
      date: this.date.value,
      process: this.process.value,
      weight: this.weigth.value,
      reprocesingId: item[0].reprocesingId
    });
    this.grindingArr.push({
      date: this.date.value,
      defrostId: 0,
      lotId: item[0].lotId,
      process: this.process.value,
      reprocesingId: item[0].reprocesingId,
      typeRecord: "REPROCESO",
      weight: this.weigth.value,
      rawMaterial: item[0].productName,
      temperature: this.temperature.value
    });
    console.log("Estado de reproceso",this.reprocesingsToRegister);
    this.resetTable();
  }
  }
  }



  removeOfGrindingArr(index:number){
    if(this.grindingArr[index].typeRecord!="REPROCESO"){
      if(this.isNewRegister){
        this.grindingArr.splice(index,1);
        this.defrostOfFormulation=this.formulation.defrosts.filter(x=>!this.grindingArr.map(x=>x.defrostId).includes(x.defrostFormulationId));
        this.resetTable();
      }
    }else if(this.hasReprocesing){
      let reprocesingId:number = this.grindingArr[index].reprocesingId;
      this.reprocesingsPendingTemp.push(...this.reprocesingsPending.filter(x=>x.reprocesingId==reprocesingId));
      this.reprocesingsToRegister=this.reprocesingsToRegister.filter(x=>x.reprocesingId!=reprocesingId);
      this.grindingArr.splice(index,1);
      this.resetTable();
      console.log("Estado de reproceso",this.reprocesingsToRegister);
    }
  }

  
  dateParseStr(date:string,hint:string){
    let dateSplited = date.split(hint);
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
}
