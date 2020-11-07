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
import { MatDialog, MatDialogRef } from '@angular/material';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';

import { SausageHourRequest, SausageOfProcess } from 'src/app/shared/models/sausage-page.interface';
import { SELECT_CURRENT_SECTION } from '../../store/sections/section.selector';


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
  
  sausageOfProcess:SausageItemToList=null;


  @Output("onSubmit") submit = new EventEmitter();

  section:string;

  isNewRegister: boolean = true;

  currentProcess:ProcessMetadata=null;
  dialogRef:MatDialogRef<ModalFormulationDetailsComponent>;
  lotDay:string=null;
  private subscriptions=new Subscription();
  public ngOnDestroy():void{
    this.subscriptions.unsubscribe();
  }

  
  secondHoursEnabled:boolean=false;
  thirdHoursEnabled:boolean=false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService,
    private dialog:MatDialog
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      formulationId:["",Validators.required],
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
    
    this.subscriptions.add(this.store.select(SELECT_SAUSAGE_DATA).subscribe((sausages)=>{
      
      if(sausages.length){
        this.isNewRegister=false;
        this.sausageOfProcess={
          sausageId:+sausages[0].sausagedId,
          date: sausages[0].date,
          lotId: sausages[0].lotId,
          temperature: sausages[0].temperature,
          time:{
            hour1: sausages[0].time.hour1,
            weightInitial: sausages[0].time.weightInitial,
            hour2: sausages[0].time.hour2,
            weightMedium: sausages[0].time.weightMedium,
            hour3: sausages[0].time.hour3,
            weightFinal: sausages[0].time.weightFinal
          }
        }
        this.date.setValue(this.sausageOfProcess.date);
        this.temperature.setValue(this.sausageOfProcess.temperature);
        this.hour1.setValue(this.sausageOfProcess.time.hour1);
        this.weightInitial.setValue(this.sausageOfProcess.time.weightInitial);
        if(sausages[0].time.hour2==null || sausages[0].time.hour2==""){
          this.secondHoursEnabled=true;
          this.thirdHoursEnabled=false;
          
        }else if(sausages[0].time.hour3==null || sausages[0].time.hour3==""){
          this.sausageOfProcess.time.hour2=sausages[0].time.hour2;
          this.sausageOfProcess.time.weightMedium=sausages[0].time.weightMedium;
          this.hour2.setValue(this.sausageOfProcess.time.hour2);
          this.weightMedium.setValue(this.sausageOfProcess.time.weightMedium);
          this.secondHoursEnabled=false;
          this.thirdHoursEnabled=true;
        }else{
          this.secondHoursEnabled=false;
          this.thirdHoursEnabled=false;
          this.hour2.setValue(this.sausageOfProcess.time.hour2);
          this.weightMedium.setValue(this.sausageOfProcess.time.weightMedium);
          this.hour3.setValue(this.sausageOfProcess.time.hour3);
          this.weightFinal.setValue(this.sausageOfProcess.time.weightFinal);
          this.sausageOfProcess.time.hour2=sausages[0].time.hour2;
          this.sausageOfProcess.time.weightMedium=sausages[0].time.weightMedium;
          this.sausageOfProcess.time.hour3=sausages[0].time.hour3;
          this.sausageOfProcess.time.weightFinal=sausages[0].time.weightFinal;
        }
        
      }
      if(localStorage.getItem("processId")!="-1"){
        this.store.dispatch(getSausageProcessMetadata());
        }
      this.subscriptions.add(this.store.select(SELECT_SAUSAGE_PROCESS_METADATA).subscribe((processMetadata)=>{
        if(processMetadata!=null){
          this.currentProcess = processMetadata;
          this.lotDay=this.currentProcess.lotDay;
          console.log("CURRENT PROCESS",this.currentProcess);
          this.formulationId.setValue(this.currentProcess.formulationId);
          if(!this.currentProcess.sausage){
          this.selectFormulationId()
          }
          
          this.productId.setValue(0)
        }
      }));
    }));
    
    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.lotDay=details.lotDay;
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
        if(this.secondHoursEnabled==true){
          this.secondHoursEnabled=false;
          this.thirdHoursEnabled=true;
        }else if(this.thirdHoursEnabled==true){
          this.thirdHoursEnabled=false;
        }
      }
    }));
   
  }

  onSubmit() {
    console.log(this.form.valid);
       if((this.form.valid && this.secondHoursEnabled==false && this.thirdHoursEnabled==false && this.isNewRegister)){
    const buttons: any = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.store.dispatch(sausageRegister(
            {
              formulationId:this.formulationId.value,
              sausages:[
                {
                  date:this.date.value,
                  lotId:this.lotDay,
                  temperature:this.temperature.value,
                  time:{
                    hour1: this.hour1.value,
                    weightInitial: this.weightInitial.value
                  }
                }
              ]
            }))  
        },
      },
    ];
    this.alert.showAlert(
      "Infomacion",
      this.isNewRegister?`Para registrar esta sección se creará un nuevo proceso`:"",
      `Los campos opcionales también deberán ser guardados más adelante para poder cerrar el proceso.`,
      buttons
    );
       }else if(this.form.valid){
        
        if(this.secondHoursEnabled==true){
          if(this.hour2.valid && this.weightMedium.valid){
            console.log("Valido para actualizar segunda hora");
            let sausageRequest:SausageHourRequest={
               hour: 2,
               hourSaved: this.hour2.value,
               weigthSaved: this.weightMedium.value
            }
            this.updateForm(this.sausageOfProcess.sausageId,sausageRequest);
          }else{
            console.log("No valido para actualizar segunda hora");
          }
        }else if(this.thirdHoursEnabled==true){
          if(this.hour2.valid && this.weightMedium.valid){
            console.log("Valido para actualizar tercera hora");
            let sausageRequest:SausageHourRequest={
               hour: 3,
               hourSaved: this.hour3.value,
               weigthSaved: this.weightFinal.value
            }
            this.updateForm(this.sausageOfProcess.sausageId,sausageRequest);
          }else{
            console.log("No valido para actualizar tercera hora");
          }
        }else{
          this.alert.showAlert("Informacion","Registro completado","El lote ya tiene todos sus campos registrados",["Aceptar"]);
        }
      }
  }

  

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

}
