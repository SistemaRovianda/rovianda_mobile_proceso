import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Grinding } from "src/app/shared/models/grinding.interface";
import {
  SELECT_GRINDING_DATA,
  SELECT_GRINDING_IS_SELECTED,
} from "../../store/grinding/grinding.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { grindingRegister } from "../../store/grinding/grinding.actions";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { SELECT_PROCESS_DETAIL_SECTION, SELECT_PROCESS_DETAIL_LOTS_MEAT, SELECT_PROCESS_METADATA } from "../../store/process-detail/process-detail.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { getProcessDetails } from '../../store/process-detail/process-detail.actions';
import { ProcessMetadata } from '../../store/process-detail/process-detail.reducer';
import { basicRegisterSelectMaterial } from '../../store/basic-register/basic-register.actions';
import { LotMeatOutput } from 'src/app/shared/models/Lot-meat-output.interface';
import { SELECT_BASIC_REGISTER_LOTS } from '../../store/basic-register/basic-register.select';

@Component({
  selector: "app-form-grinding",
  templateUrl: "./form-grinding.component.html",
  styleUrls: ["./form-grinding.component.scss"],
})
export class FormGrindingComponent implements OnInit {
  grinding: Grinding;

  form: FormGroup;

  isSelected: boolean;

  @Input() products: RawMaterial[];

  @Input() materials: ProductsRovianda[];

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isNewRegister: boolean;

  section: string;

  @Input() lotsMeat: LotMeatOutput[]=[];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      rawMaterial: ["", Validators.required],
      process: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      date: [this.minDate, Validators.required],
      productId: ["", [Validators.required]],
      loteMeat: ["", []],
    });
  }

  ngOnInit() {
    
    if(localStorage.getItem("processId")!=null && +localStorage.getItem("processId")!=-1){
      this.store.dispatch(getProcessDetails());  
      this.store.pipe(select(SELECT_PROCESS_METADATA)).subscribe((process:ProcessMetadata)=>{
        console.log("PROCESS MOLIENDA",process);
        console.log("PROCESS MOLIENDA",this.lotsMeat);
        if(process!=null && process.loteInterno!=""){
          this.store
          .select(SELECT_BASIC_REGISTER_LOTS)
          .subscribe((lots) => (this.lotsMeat = lots.filter((x)=>x.outputId==process.outputLotRecordId)));    
      }
      console.log("PROCESS MOLIENDA",this.lotsMeat);
      })
  }else{
    this.store
      .select(SELECT_BASIC_REGISTER_LOTS)
      .subscribe((lots) => (this.lotsMeat = lots));
  }
    this.store.select(SELECT_GRINDING_DATA).subscribe((tempGrinding) => {
      if (tempGrinding != null) {
        this.grinding = tempGrinding;
        this.updateForm();
      }
    });
    this.store
      .select(SELECT_GRINDING_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => {
        this.isNewRegister = isNew;
        if (isNew) {
          this.form.get("loteMeat").setValidators([Validators.required]);
        }
      });
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
      .subscribe((success) => {
        if (success && this.section === "MOLIENDA") {
          this.registerGrinding();
        }
      });
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.section = this.section = section.section));
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
          this.isNewRegister
            ? this.store.dispatch(recentRecordsCreateNewProcess())
            : this.registerGrinding();
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

  registerGrinding() {
    const { date, ...values } = this.form.value;
    console.log("GRINDING VALUES",values);
    this.store.dispatch(
      grindingRegister({ date: moment(date).format("YYYY-MM-DD"), ...values })
    );
  }

  updateForm() {
    const { ...values } = this.grinding;

    this.form.patchValue({ productId: this.grinding.nameProduct, ...values });
  }

  selectMaterial() {
    
    this.store.dispatch(
      basicRegisterSelectMaterial({
        status: "USED",
        rawMaterialId: this.form.get("rawMaterial").value,
      })
    );
  
}
}
