import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
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
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";
import { SELECT_BASIC_REGISTER_LOTS } from "../../store/basic-register/basic-register.select";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";

@Component({
  selector: "app-form-conditioning",
  templateUrl: "./form-conditioning.component.html",
  styleUrls: ["./form-conditioning.component.scss"],
})
export class FormConditioningComponent implements OnInit {
  conditioning: Conditioning;

  form: FormGroup;

  @Input() materials: RawMaterial[];

  @Input() products: ProductsRovianda[];

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

  isNewRegister: boolean;

  section: string;

  @Input() lotsMeat: ProcessLotMeat[];

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
