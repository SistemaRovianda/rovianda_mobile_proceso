import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import {  SausageItemToList } from "src/app/shared/models/sausage.interface";
import {
  SELECT_SAUSAGE_DATA,
  SELECT_SAUSAGE_ERRORS_UPDATING,
  SELECT_SAUSAGE_IS_LOADING,
  SELECT_SAUSAGE_PROCESS_METADATA,
  SELECT_SAUSAGE_SAUSAGE,
} from "../../store/sausage/sausage.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import {
  getFormulationsByProductRovianda,
  getSausageProcessMetadata,
  sausageRegister,
  sausageSearchInformation,
  updateSausageHour,
} from "../../store/sausage/sausage.actions";

import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
} from "../../store/recent-records/recent-records.selector";

import { SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA } from "../../store/process-detail/process-detail.selector";

import { from, Observable, Subscription } from 'rxjs';
import { ProductsRovianda } from 'src/app/shared/models/produts-rovianda.interface';
import { FormulationDefrost, FormulationDetails, FormulationPending } from 'src/app/shared/models/formulations.interface';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { SausageHourRequest, SausageOfProcess } from 'src/app/shared/models/sausage-page.interface';
import { SELECT_CURRENT_SECTION } from '../../store/sections/section.selector';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: "app-form-sausage",
  templateUrl: "./form-sausage.component.html",
  styleUrls: ["./form-sausage.component.scss"],
})
export class FormSausageComponent implements OnInit,OnDestroy {
  

  form: FormGroup;

  productsRovianda$: Observable<ProductsRovianda[]> = from([]);
  formulations:Observable<FormulationPending[]>=from([[]]);
  defrostOfFormulation:FormulationDefrost[]=[];
  formulation:FormulationDetails={
    date:null,defrosts:[],id:null,lotDay:null,make:null,productRovianda:null,status:null,temp:null,
    verifit:null,waterTemp:null,reprocesings:[]
  }
  sausageArr:SausageItemToList[]=[];
  sausageOfProcess:SausageOfProcess[]=[];
  matTableDataSource:MatTableDataSource<SausageItemToList>;
  displayedColumns:string[] = ["Lote","Materia Prima","Temperatura","Fecha"];

  @Output("onSubmit") submit = new EventEmitter();

  section:string;

  isNewRegister: boolean = true;

  currentProcess:ProcessMetadata=null;
  dialogRef:MatDialogRef<ModalFormulationDetailsComponent>;

  private subscriptions=new Subscription();
  public ngOnDestroy():void{
    this.subscriptions.unsubscribe();
  }


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService,
    private dialog:MatDialog
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      formulationId:["",Validators.required],
      defrostId:["",Validators.required],
      temperature: ["", Validators.required],
      date: ["", Validators.required],
      hour1: [new Date().toISOString(), Validators.required],
      weightInitial: ["", [Validators.required]],
      hour2: [""],
      weightMedium: ["", ],
      hour3: [""],
      weightFinal: [""],
    });
    this.subscriptions.add(this.store.select(SELECT_CURRENT_SECTION).subscribe((section)=>{
      this.section=section;
    }));
    this.matTableDataSource=new MatTableDataSource();
    this.resetTable();
    this.subscriptions.add(this.store.select(SELECT_SAUSAGE_DATA).subscribe((sausages)=>{
      this.sausageOfProcess=sausages;
      if(this.sausageOfProcess.length){
        this.sausageArr=this.sausageOfProcess.map((x)=>{
          return {
            sausageId: +x.sausagedId,
            date: x.date,
            defrostId:0,
            lotId: x.lotId,
            temperature: x.temperature,
            time:{
              hour1: x.time.hour1,
              weightInitial: x.time.weightInitial,
              hour2: x.time.hour2,
              weightMedium: x.time.weightMedium,
              hour3: x.time.hour3,
              weightFinal: x.time.weightMedium
            },
            productRovianda: x.rawMaterial
          }
        })  
        this.resetTable(); 
      }else{
        if(localStorage.getItem("processId")!="-1"){
          this.store.dispatch(getSausageProcessMetadata());
          }
        this.subscriptions.add(this.store.select(SELECT_SAUSAGE_PROCESS_METADATA).subscribe((processMetadata)=>{
          if(processMetadata!=null){
            this.currentProcess = processMetadata;
            console.log("CURRENT PROCESS",this.currentProcess);
            this.formulationId.setValue(this.currentProcess.formulationId);
            if(!this.currentProcess.sausage){
            this.selectFormulationId()
            }
            
            this.productId.setValue(0)
          }
        }));
        
      }
    }));
    
    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.defrostOfFormulation=this.formulation.defrosts;
      this.sausageArr=[];
      if(details.id!=null && this.isNewRegister && this.section=="SAUSAGE"){
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

    this.subscriptions.add(this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      
      if(!isNewRegister){
        this.isNewRegister=isNewRegister;
        console.log("NO ES NUEVO");
        this.store.dispatch(sausageSearchInformation({processId:+localStorage.getItem("processId")}));
      }else{
        this.productsRovianda$=this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
        this.formulations = this.store.select(SELECT_SAUSAGE_SAUSAGE);
      }
    }));
  }

  selectProductRovianda(){
    console.log("Solicitando formulaciones");
    if(this.productId.value!=null && this.productId.value!=0){
    this.store.dispatch(getFormulationsByProductRovianda({productRoviandaId:this.productId.value}));
    }
  }
  selectFormulationId(){
    if(this.formulationId.value!=null){
    this.store.dispatch(
      getFormulationDetails({formulationId:this.formulationId.value})
    );
    }
  }

  resetTable(){
    this.matTableDataSource.data = this.sausageArr;
  }
  isLoading:boolean =false;
  error=null;
  ngOnInit() {
    this.subscriptions.add(this.store.select(SELECT_SAUSAGE_ERRORS_UPDATING).subscribe((error)=>{
      this.error = error;
    }));
    this.subscriptions.add(this.store.select(SELECT_SAUSAGE_IS_LOADING).subscribe((isLoading:boolean)=>{
      if(isLoading==true){
        this.isLoading = isLoading;
      }else if (isLoading==false && this.isLoading==true){
        if(this.sausageSelected!=null){
          let sausageItem = this.sausageArr[this.sausageSelected];
          if(sausageItem.time.hour2==null || sausageItem.time.hour2==""){
            if(this.error!=null){
              this.hour2.setValue(null);
              this.weightMedium.setValue(null);
            }else{
              this.sausageArr[this.sausageSelected].time.hour2=this.hour2.value;
              this.sausageArr[this.sausageSelected].time.weightMedium=this.weightMedium.value;
              this.secondHoursEnabled=false;
              this.thirdHoursEnabled=true;
            }
          }else if(sausageItem.time.hour3==null || sausageItem.time.hour3==""){
            if(this.error!=null){
              this.hour3.setValue(null);
              this.weightFinal.setValue(null);
            }else{
              this.sausageArr[this.sausageSelected].time.hour3=this.hour3.value;
              this.sausageArr[this.sausageSelected].time.weightFinal=this.weightFinal.value;
              this.thirdHoursEnabled=false;
            }
          }
        }
      }
    }));
   
  }

  onSubmit() {
       if((this.sausageArr.length && this.isNewRegister) || (!this.isNewRegister && !this.sausageOfProcess.length)){
    const buttons: any = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.store.dispatch(sausageRegister({formulationId:this.formulationId.value,sausages:this.sausageArr}))  
        },
      },
    ];
    this.alert.showAlert(
      "Infomacion",
      `${
        this.isNewRegister
          ? "Para registrar esta sección se creará un nuevo proceso"
          : ""
      }`,
      `Los campos opcionales también deberán ser guardados más adelante para poder cerrar el proceso.`,
      buttons
    );
       }else if(this.sausageSelected!=null){
        console.log("Ya esta",this.sausageSelected);
        if(this.sausageArr[this.sausageSelected].time.hour2==null ||this.sausageArr[this.sausageSelected].time.hour2=="" ){
          if(this.hour2.valid && this.weightMedium.valid){
            console.log("Valido para actualizar segunda hora");
            let sausageRequest:SausageHourRequest={
               hour: 2,
               hourSaved: this.hour2.value,
               weigthSaved: this.weightMedium.value
            }
            this.updateForm(this.sausageArr[this.sausageSelected].sausageId,sausageRequest);
          }else{
            console.log("No valido para actualizar segunda hora");
          }
        }else if(this.sausageArr[this.sausageSelected].time.hour3==null ||this.sausageArr[this.sausageSelected].time.hour3=="" ){
          if(this.hour2.valid && this.weightMedium.valid){
            console.log("Valido para actualizar tercera hora");
            let sausageRequest:SausageHourRequest={
               hour: 3,
               hourSaved: this.hour3.value,
               weigthSaved: this.weightFinal.value
            }
            this.updateForm(this.sausageArr[this.sausageSelected].sausageId,sausageRequest);
          }else{
            console.log("No valido para actualizar tercera hora");
          }
        }else{
          this.alert.showAlert("Informacion","Registro completado","El lote ya tiene todos sus campos registrados",["Aceptar"]);
        }
      }
  }

  


  // onSubmitDate() {
  //   if(this.sausageArr.length){
  //       this.registerSausage();
  //   }
  // }

  registerSausage() {
    const { date, hour1, weightInitial, ...values } = this.form.value;

    this.store.dispatch(
      sausageRegister({
        ...values,
        date: moment(date).format("YYYY-MM-DD"),
        time: {
          hour: moment(hour1).format("HH:mm"),
          weight: weightInitial,
        },
      })
    );
  }

  updateForm(sausageId:number,sausageHours:SausageHourRequest) {
    this.store.dispatch(updateSausageHour({sausageId,sausageHours}));
  }

  get productId() {
    return this.form.get("productId");
  }

  get formulationId(){
    return this.form.get("formulationId");
  }
  get temperature() {
    return this.form.get("temperature");
  }

  get date() {
    return this.form.get("date");
  }

  get hour1() {
    return this.form.get("hour1");
  }

  get weightInitial() {
    return this.form.get("weightInitial");
  }

  get hour2() {
    return this.form.get("hour2");
  }

  get hour3() {
    return this.form.get("hour3");
  }

  get weightMedium() {
    return this.form.get("weightMedium");
  }

  get weightFinal() {
    return this.form.get("weightFinal");
  }

  get defrostId(){
    return this.form.get("defrostId");
  }

  get fieldsRequireds() {
    return (
      this.productId.valid &&
      this.temperature.valid &&
      this.date.valid &&
      this.hour1.valid &&
      this.weightInitial.valid
    );
  }
  get fieldsOptionalMedium() {
    return this.hour2.value === "" || this.weightMedium.invalid;
  }

  get fieldsOptionalFinal() {
    return this.hour3.value === "" || this.weightFinal.invalid;
  }

  addItem(){
    console.log(this.form.valid,this.form.value);
    if(this.form.valid){

        let has=this.sausageArr.filter(x=>x.defrostId==this.form.get('defrostId').value);
        if(!has.length){
          this.defrostOfFormulation=this.defrostOfFormulation.filter(x=>x.defrostFormulationId!=this.defrostId.value);
          console.log("agregando");
          let lotString = "";
          let productRovianda="";
          console.log("defrostId",this.defrostId.value);
          for(let defrost of this.formulation.defrosts){
            console.log(defrost);
            if(defrost.defrostFormulationId==+this.defrostId.value){
              lotString=defrost.lotMeat;
              productRovianda = defrost.defrost.outputCooling.rawMaterial.rawMaterial;
              console.log("coincide");
            }else{
              console.log("no coincide");
            }
          }
          let item:SausageItemToList ={
            date: this.date.value,
            defrostId: this.defrostId.value,
            temperature: this.temperature.value,
            time:{
              hour1: this.hour1.value,
              weightInitial: this.weightInitial.value,
            },
            lotId:lotString,
            productRovianda
          }
          this.sausageArr.push(item);
          this.resetTable();
        }
    }
  }
  removeOfSausageArr(index:number){
    this.sausageArr.splice(index,1);
    this.defrostOfFormulation=this.formulation.defrosts.filter(x=>!this.sausageArr.map(x=>x.defrostId).includes(x.defrostFormulationId));
    this.resetTable()
  }

  secondHoursEnabled:boolean=false;
  thirdHoursEnabled:boolean=false;
  sausageSelected:NumberSymbol;
  selectItemToUpdate(index:number){
    
    if(index==this.sausageSelected){
      this.sausageSelected=null;
      this.secondHoursEnabled=false;
      this.thirdHoursEnabled=false;
    }else{
      this.sausageSelected=index;
      let sausageItem:SausageItemToList = this.sausageArr[index];
      this.date.setValue(sausageItem.date);
      this.temperature.setValue(sausageItem.temperature);
      console.log("Sausaged selected: ",sausageItem);
      this.weightInitial.setValue(sausageItem.time.weightInitial);
      this.hour1.setValue(sausageItem.time.hour1);
      if(sausageItem.time.hour2==null|| sausageItem.time.hour2==""){
        this.secondHoursEnabled=true;
        this.hour2.reset();
        this.weightMedium.reset();
        this.thirdHoursEnabled=false;
      }else if(sausageItem.time.hour3==null || sausageItem.time.hour3==""){
        this.weightMedium.setValue(sausageItem.time.weightMedium);
        this.hour2.setValue(sausageItem.time.hour2);
        this.thirdHoursEnabled=true;
        this.hour3.reset();
        this.weightFinal.reset();
        this.secondHoursEnabled=false;
      }else{
        console.log("Contiene todos los registros");
        this.hour2.setValue(sausageItem.time.hour2);
        this.weightMedium.setValue(sausageItem.time.weightMedium);
        this.hour3.setValue(sausageItem.time.hour3);
        this.weightFinal.setValue(sausageItem.time.weightFinal);
        this.secondHoursEnabled=false;
        this.thirdHoursEnabled=false;
      }
      this.resetTable();
    }
    
    
  }



}
