import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { Conditioning } from "src/app/shared/models/conditioning.interface";
import {
  SELECT_CONDITIONING_DATA,
  SELECT_CONDITIONING_IS_SELECTED,
} from "../../store/conditioning/conditioning.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import { conditioningRegister } from "../../store/conditioning/conditioning.actions";
import * as moment from "moment";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";

@Component({
  selector: "app-form-conditioning",
  templateUrl: "./form-conditioning.component.html",
  styleUrls: ["./form-conditioning.component.scss"],
})
export class FormConditioningComponent implements OnInit {
  conditioning: Conditioning;

  form: FormGroup;

  @Input() products: ProductCatalog[];

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

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
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
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
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 1, step: !this.form.invalid }));
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
          this.registerConditioning();
        },
      },
    ];
    if (this.form.valid) {
      this.alert.showAlert(
        "Informacion",
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
}
