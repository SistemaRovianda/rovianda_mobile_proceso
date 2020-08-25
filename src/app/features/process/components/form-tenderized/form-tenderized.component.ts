import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Tenderized } from "src/app/shared/models/tenderized.interface";
import {
  SELECT_TENDERIZED_DATA,
  SELECT_TENDERIZED_IS_SELECTED,
} from "../../store/tenderized/tenderized.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { tenderizedRegister } from "../../store/tenderized/tenderized.actions";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { recentRecordsCreateNewProcess } from "../../store/recent-records/recent-records.actions";
import {
  SELECT_RECENT_RECORDS_IS_NEW_REGISTER,
  SELECT_RECENT_RECORDS_PROCESS_SUCCESS,
} from "../../store/recent-records/recent-records.selector";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { SELECT_PROCESS_DETAIL_SECTION } from "../../store/process-detail/process-detail.selector";

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

  @Input() products: ProductCatalog[];

  @Input() lotsMeat: ProcessLotMeat[];

  isNewRegister: boolean;

  section: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = this.fb.group({
      productId: ["", Validators.required],
      temperature: ["", Validators.required],
      weight: ["", [Validators.required, decimalValidator]],
      weightSalmuera: ["", [Validators.required, decimalValidator]],
      percentage: ["", Validators.required],
      date: [this.minDate, Validators.required],
      loteMeat: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.store.select(SELECT_TENDERIZED_DATA).subscribe((tempTenderized) => {
      if (tempTenderized != null) {
        this.tenderized = tempTenderized;
        this.updateForm();
      }
    });
    this.store
      .select(SELECT_TENDERIZED_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
    this.store
      .select(SELECT_RECENT_RECORDS_IS_NEW_REGISTER)
      .subscribe((isNew) => (this.isNewRegister = isNew));
    this.store
      .select(SELECT_RECENT_RECORDS_PROCESS_SUCCESS)
      .subscribe((success) => {
        if (success && this.section === "INJECCIONTENDERIZADO") {
          this.registerTenderized();
        }
      });
    this.store
      .select(SELECT_PROCESS_DETAIL_SECTION)
      .subscribe((section) => (this.section = section.section));
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
          this.isNewRegister
            ? this.store.dispatch(recentRecordsCreateNewProcess())
            : this.registerTenderized();
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
}
