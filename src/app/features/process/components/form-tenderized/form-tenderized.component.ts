import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Tenderized } from "src/app/shared/models/tenderized.interface";
import {
  GET_FORMULATIONS_PENDING_TENDERIZED,
  SELECT_TENDERIZED_DATA,
  SELECT_TENDERIZED_IS_SELECTED,
} from "../../store/tenderized/tenderized.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { getFormulationsByProductRovianda, tenderizedRegister } from "../../store/tenderized/tenderized.actions";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { SELECT_PROCESS_DETAIL_SECTION, SELECT_PROCESS_METADATA, SELECT_PROCESS_DETAIL_LOTS_MEAT, SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA } from "../../store/process-detail/process-detail.selector";
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { ProductsRovianda } from 'src/app/shared/models/produts-rovianda.interface';
import { from, Observable } from 'rxjs';
import { FormulationDefrost, FormulationDetails, FormulationPending } from 'src/app/shared/models/formulations.interface';
import { getFormulationDetails } from '../../store/formulation/formulation.actions';
import { GET_FORMULATION_DETAILS } from '../../store/formulation/formulation.selectors';
import { ModalFormulationDetailsComponent } from '../modal-formulation-details/modal-formulation-details.component';
import { MatDialog } from '@angular/material';
import { TenderizedItemToList } from 'src/app/shared/models/tenderized-page.interface';

@Component({
  selector: "app-form-tenderized",
  templateUrl: "./form-tenderized.component.html",
  styleUrls: ["./form-tenderized.component.scss"],
})
export class FormTenderizedComponent implements OnInit {
  tenderized: Tenderized;

  form: FormGroup;

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

  productsRovianda: Observable<ProductsRovianda[]>= from([]);

  @Input() lotsMeat: ProcessLotMeat[]=[];

  isNewRegister: boolean=true;

  section: string;
  tenderizedArr:TenderizedItemToList[]=[];
  formulations:Observable<FormulationPending[]>=from([]);
  formulation:FormulationDetails={date:null,waterTemp:null,verifit:null,temp: null,productRovianda:null,make:null,lotDay:null,defrosts:null,id:null,status:null}
  defrostOfFormulation:FormulationDefrost[];
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

    this.store.select(GET_FORMULATION_DETAILS).subscribe((details)=>{
      this.formulation=details;
      this.defrostOfFormulation=this.formulation.defrosts;
      if(this.formulation.id!=null && this.isNewRegister){
        const dialogRef = this.dialog.open(ModalFormulationDetailsComponent, {
          width: '500px',
          height:"50%",
          data: this.formulation
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          
        });
      }
    })
  }

  ngOnInit() {
    
    this.store.select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER).subscribe((isNewRegister)=>{
      if(isNewRegister){
        this.productsRovianda = this.store.select( // en caso de no existir se asigna al arreglo varios productos de rovianda para su registro
          SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA
        );
        this.formulations = this.store.select(GET_FORMULATIONS_PENDING_TENDERIZED);
      }else{

      }
    })

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
    if (this.tenderizedArr.length) {
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
    this.store.dispatch(
      getFormulationsByProductRovianda({
        productRoviandaId: this.productId.value,
      })
    );
  }

  selectFormulationId(){ // una vez seleccionado la formulacion, se obtienen los lotes de carne de esa formulacion para su tratamiento individual
    console.log("llamando");
    this.store.dispatch(
      getFormulationDetails({formulationId:this.formulationId.value})
    );
  }

  registerTenderized() {
    const { date, ...values } = this.form.value;

    this.store.dispatch(
      tenderizedRegister({
        ...values,
        date: moment(date).format("YYYY-MM-DD"),
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
          console.log("defrostId",this.defrostId.value);
          for(let defrost of this.formulation.defrosts){
            console.log(defrost);
            if(defrost.defrostFormulationId==+this.defrostId.value){
              lotString=defrost.lotMeat;
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
            lotId: lotString
          };
          
          this.date.setValue("");
          this.percentage.setValue("");
          //this.defrostId.setValue("");
          this.percentage.setValue("");
          this.temperature.setValue("");
          this.weigth.setValue("");
          this.weightSalmuera.setValue("");
          
          this.tenderizedArr.push(tenderizedItemToAdd);
        }else{
          console.log("Ya esta");
        }
    }
  }
}
