import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Conditioning } from "src/app/shared/models/conditioning.interface";
import {
  SELECT_CONDITIONING_DATA,
  SELECT_CONDITIONING_IS_SELECTED,
} from "../../store/conditioning/conditioning.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import { conditioningRegister } from "../../store/conditioning/conditioning.actions";
import * as moment from "moment";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { SELECT_PROCESS_DETAIL_SECTION, SELECT_PROCESS_METADATA, SELECT_PROCESS_DETAIL_LOTS_MEAT, SELECT_PROCESS_DETAIL_MATERIALS } from "../../store/process-detail/process-detail.selector";
import { SELECT_BASIC_REGISTER_LOTS } from "../../store/basic-register/basic-register.select";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { LotMeatOutput } from 'src/app/shared/models/Lot-meat-output.interface';
import { basicRegisterSelectMaterial } from '../../store/basic-register/basic-register.actions';
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Process } from 'src/app/shared/models/process.interface';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';

@Component({
  selector: "app-form-conditioning",
  templateUrl: "./form-conditioning.component.html",
  styleUrls: ["./form-conditioning.component.scss"],
})
export class FormConditioningComponent implements OnInit {
  conditioning: Conditioning;

  form: FormGroup;

  materials: RawMaterial[];

  @Input() products: ProductsRovianda[];

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

  isNewRegister: boolean;

  section: string;

  lotsMeat: ProcessLotMeat[]=[];

  processId:string;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      rawMaterial: ["", Validators.required],
      bone: [false, Validators.required],
      clean: [false, Validators.required],
      healthing: [false, Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      temperature: ["", Validators.required],
      productId: ["", Validators.required],
      date: [this.minDate, Validators.required],
      lotMeat: [""],
    });
  }

  ngOnInit() {
    this.store.select(
      SELECT_PROCESS_DETAIL_MATERIALS
    ).subscribe((materials)=>{
      this.materials = materials;
    })
    
    if(localStorage.getItem("processId")!=null && +localStorage.getItem("processId")!=-1){
          
        this.store.pipe(select(SELECT_PROCESS_METADATA)).subscribe((process:ProcessMetadata)=>{
          console.log("PROCESS CONDICIONAMIENTO",process);
          if(process!=null && process.loteInterno!=""){
          this.lotsMeat = [
            {
              loteMeat:process.loteInterno,
              productId:0
            }
          ];
        }else {
          this.store.dispatch(getProcessDetails());
        }
        })
    }else{
      this.store.select(
        SELECT_PROCESS_DETAIL_LOTS_MEAT
      ).subscribe((lots) => (this.lotsMeat = lots));
    }
    this.store
      .select(SELECT_CONDITIONING_DATA)
      .subscribe((tempConditioning) => {
        if (tempConditioning != null) {
          this.conditioning = tempConditioning;
          this.updateForm();
        }
      });
    this.store
      .select(SELECT_CONDITIONING_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => (this.isNewRegister = isNew));
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
      .subscribe((success) => {
        if (success && this.section === "ACONDICIONAMIENTO") {
          this.registerConditioning();
        }
      });
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.section = this.section = section.section));
  }

  onSubmit() {
    const buttons: any = [
      {
        text: "Cancelar",
        role: "cancel",
      },
      {
        text: "Aceptar",
        handler: () => {
          this.isNewRegister
            ? this.store.dispatch(recentRecordsCreateNewProcess())
            : this.registerConditioning();
        },
      },
    ];
    if (this.form.valid) {
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

  registerConditioning() {
    const { date, ...values } = this.form.value;

    this.store.dispatch(
      conditioningRegister({
        ...values,
        date: moment(date).format("YYYY-MM-DD"),
      })
    );
  }

  updateForm() {
    const { product, ...value } = this.conditioning;
    this.form.patchValue({
      productId: product.description,
      ...value,
    });
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

  get rawMaterial() {
    return this.form.get("rawMaterial");
  }

  get lotId() {
    return this.form.get("lotId");
  }
  

}
