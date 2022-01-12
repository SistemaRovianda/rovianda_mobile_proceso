import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Tenderized } from "src/app/shared/models/tenderized.interface";
import {
  GET_FORMULATIONS_PENDING_TENDERIZED,
  SELECT_TENDERIZED_DATA,
  SELECT_TENDERIZED_PROCESS_METADATA,
} from "../../store/tenderized/tenderized.selector";
import { AlertService } from "src/app/shared/services/alert.service";

import { getFormulationsByProductRovianda, getTenderizedProcessMetadata, tenderizedRegister, tenderizedSearchInformation } from "../../store/tenderized/tenderized.actions";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";

import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER
} from "../../store/recent-records/recent-records.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA, SELECT_PROCESS_METADATA } from "../../store/process-detail/process-detail.selector";
import { ProductsRovianda } from 'src/app/shared/models/produts-rovianda.interface';
import { from, Observable, Subscription } from 'rxjs';
import { FormulationDefrost, FormulationDetails, FormulationPending } from 'src/app/shared/models/formulations.interface';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { TenderizedItemToList, TenderizedOfProcess } from 'src/app/shared/models/tenderized-page.interface';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { SELECT_CURRENT_SECTION } from '../../store/sections/section.selector';

@Component({
  selector: "app-form-tenderized",
  templateUrl: "./form-tenderized.component.html",
  styleUrls: ["./form-tenderized.component.scss"],
})
export class FormTenderizedComponent implements OnInit,OnDestroy {
  tenderized: Tenderized;

  form: FormGroup;

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

  productsRovianda: Observable<ProductsRovianda[]>= from([]);


  isNewRegister: boolean=true;
  tenderizedSaved:TenderizedOfProcess[]=[];
  section: string;
  tenderizedArr:TenderizedItemToList[]=[];
  formulations:Observable<FormulationPending[]>=from([]);
  formulation:FormulationDetails={date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:null,id:null,status:null,reprocesings:[]}
  defrostOfFormulation:FormulationDefrost[];
  displayedColumns:string[] = ["Lote","Materia Prima","Peso","Peso Salmuera","Porcentaje","Fecha"];
  matTableDataSource:MatTableDataSource<TenderizedItemToList>;
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
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      productId: ["", Validators.required],
      formulationId:["",Validators.required],
      temperature: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      weightSalmuera: ["", [Validators.required, decimalValidator]],
      percentage: ["", Validators.required],
      date: [this.minDate, Validators.required],
      defrostId: ["", Validators.required],
    });
    this.subscriptions.add(this.store.select(SELECT_CURRENT_SECTION).subscribe((section)=>{
      this.section=section;
    }))
    this.matTableDataSource = new MatTableDataSource();
    this.resetTable();
    this.subscriptions.add(this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.defrostOfFormulation=this.formulation.defrosts;
      this.tenderizedArr=[];
      if(details.id!=null && this.isNewRegister && this.section=="TENDERIZED"){
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

    this.subscriptions.add(this.store.select(SELECT_TENDERIZED_DATA).subscribe((tenderizeds)=>{
      this.tenderizedSaved = tenderizeds;
      if(this.tenderizedSaved.length){
      this.tenderizedArr=tenderizeds.map((x)=>{
        return {
          date: x.date,
          defrostId: 0,
          lotId: x.lotId,
          percentage: x.percentage,
          temperature: x.temperature,
          weight: x.weight,
          weightSalmuera: x.weightSalmuera,
          rawMaterial: x.rawMaterial
        }
      });
      this.resetTable();
      }else{
        this.subscriptions.add(this.store.select(SELECT_TENDERIZED_PROCESS_METADATA).subscribe((processMetadata)=>{
          if(processMetadata!=null){
            this.currentProcess = processMetadata;
            console.log("CURRENT PROCESS",this.currentProcess);
            this.formulationId.setValue(this.currentProcess.formulationId);
            if(!this.currentProcess.tenderized){
            this.selectFormulationId()
            }
            this.productId.setValue(0)
          }
        }));
        if(localStorage.getItem("processId")!="-1"){
        this.store.dispatch(getTenderizedProcessMetadata());
        }
      }
    }))

    this.subscriptions.add(this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      if(isNewRegister){
        this.productsRovianda = this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
        this.formulations = this.store.select(GET_FORMULATIONS_PENDING_TENDERIZED);
      }else{
        console.log("Llamando a servicio para obtener detalles de tenderizado");
        this.isNewRegister = isNewRegister;
        this.store.dispatch(tenderizedSearchInformation({processId:+localStorage.getItem("processId")}));
      }
    }))

  }

  resetTable(){
    this.matTableDataSource.data = this.tenderizedArr;
  }

  ngOnInit() {
   

  //   if(localStorage.getItem("processId")!=null && +localStorage.getItem("processId")!=-1){
        
  //     this.store.pipe(select(SELECT_PROCESS_METADATA)).subscribe((process:ProcessMetadata)=>{
  //       console.log("PROCESS TENDERIZADO",process);
  //       console.log("PROCESS TENDERIZADO",this.lotsMeat);
  //       if(process!=null && process.loteInterno!=""){
  //       this.lotsMeat = [
  //         {
  //           loteMeat:process.loteInterno,
  //           productId:0
  //         }
  //       ];
  //     }else{
  //       this.store.dispatch(getProcessDetails());
  //     }
  //     console.log("PROCESS TENDERIZADO",this.lotsMeat);
  //     })
  // }else{
  //   this.store.select(
  //     SELECT_PROCESS_DETAIL_LOTS_MEAT
  //   ).subscribe((lots) => (this.lotsMeat = lots));
  // }

  //   this.store.select(SELECT_TENDERIZED_DATA).subscribe((tempTenderized) => {
  //     if (tempTenderized != null) {
  //       this.tenderized = tempTenderized;
  //       this.updateForm();
  //     }
  //   });
  //   this.store
  //     .select(SELECT_TENDERIZED_IS_SELECTED)
  //     .subscribe((selected) => (this.isSelected = selected));
  //   this.store
  //     .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
  //     .subscribe((isNew) => (this.isNewRegister = isNew));
  //   this.store
  //     .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
  //     .subscribe((success) => {
  //       if (success && this.section === "INJECCIONTENDERIZADO") {
  //         this.registerTenderized();
  //       }
  //     });
  //   this.store
  //     .select(SELECT_PROCESS_DETAIL_SECTION)
  //     .subscribe((section) => (this.section = section.section));
  }

  onSubmit() {
    
    const buttons: any = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
           this.registerTenderized();
        },
      },
    ];
    if (this.tenderizedArr.length && !this.tenderizedSaved.length) {
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

  get productId(){
    return this.form.get('productId');
  }

  get formulationId(){
    return this.form.get('formulationId')
  }
  selectProductRovianda(){
    console.log("se selecciono un producto de rovianda",this.productId.value);
    if(this.productId.value!=null && this.productId.value!=0){
    this.store.dispatch(
      getFormulationsByProductRovianda({
        productRoviandaId: this.productId.value,
      })
    );
    }
  }

  selectFormulationId(){ // una vez seleccionado la formulacion, se obtienen los lotes de carne de esa formulacion para su tratamiento individual
    console.log("llamando");
    if(this.formulationId.value!=null){
    this.store.dispatch(
      getFormulationDetails({formulationId:this.formulationId.value})
    );
    }
  }

  registerTenderized() {
    this.store.dispatch(
      tenderizedRegister({
        formulationId: this.formulationId.value,
        tenderizedItems: this.tenderizedArr
      })
    );
  }

  updateForm() {
    const { weight_salmuera, product, ...value } = this.tenderized;
    this.form.patchValue({
      weightSalmuera: weight_salmuera,
      productId: product.description,
      ...value,
    });
  }

  get defrostId(){
    return this.form.get('defrostId');
  }

  get date(){
    return this.form.get('date');
  }

  get percentage(){
    return this.form.get("percentage");
  }

  get temperature(){
    return this.form.get("temperature");
  }

  get weigth(){
    return this.form.get("weight");
  }

  get weightSalmuera(){
    return this.form.get("weightSalmuera");
  }

  addItem(){
if(this.form.valid){

        let has=this.tenderizedArr.filter(x=>x.defrostId==this.form.get('defrostId').value);
        if(!has.length){
          this.defrostOfFormulation=this.defrostOfFormulation.filter(x=>x.defrostFormulationId!=this.form.get('defrostId').value);
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
          
          let tenderizedItemToAdd:TenderizedItemToList={
            date: this.date.value,
            defrostId: this.defrostId.value,
            percentage: this.percentage.value,
            temperature: this.temperature.value,
            weight: this.weigth.value,
            weightSalmuera: this.weightSalmuera.value,
            lotId: lotString,
            rawMaterial
          };
          
          this.date.setValue("");
          this.percentage.setValue("");
          
          this.percentage.setValue("");
          this.temperature.setValue("");
          this.weigth.setValue("");
          this.weightSalmuera.setValue("");
          
          this.tenderizedArr.push(tenderizedItemToAdd);
          this.resetTable();
        }else{
          console.log("Ya esta");
        }
    }
  }

  removeOfTenderizedArr(index:number){ // metodo que elimina los registros de lotes a condicionamiento
    this.tenderizedArr.splice(index,1);
    this.defrostOfFormulation=this.formulation.defrosts.filter(x=>!this.tenderizedArr.map(x=>x.defrostId).includes(x.defrostFormulationId));
    this.resetTable();
  }


  
  dateParseStr(date:string,hint:string){
    let dateSplited = date.split(hint);
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
}
