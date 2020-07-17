import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { Sausage } from "src/app/shared/models/sausage.interface";
import {
  SELECT_SAUSAGE_DATA,
  SELECT_SAUSAGE_IS_SELECTED,
} from "../../store/sausage/sausage.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import {
  sausageRegister,
  sausageStartRegisterDateAndWeigth,
} from "../../store/sausage/sausage.actions";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { decimalValidator } from "src/app/shared/validators/decimal.validator";

@Component({
  selector: "app-form-sausage",
  templateUrl: "./form-sausage.component.html",
  styleUrls: ["./form-sausage.component.scss"],
})
export class FormSausageComponent implements OnInit {
  sausage: Sausage;

  form: FormGroup;

  @Input() products: ProductCatalog[];

  @Output("onSubmit") submit = new EventEmitter();

  minDate = new Date().toISOString();

  maxDate = new Date().getFullYear() + 5;

  isSelected: boolean;

  optionalMedium = false;

  optionalFinal = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      temperature: ["", Validators.required],
      date: [this.minDate, Validators.required],
      hour1: [new Date().toISOString(), Validators.required],
      weightInitial: ["", [Validators.required, decimalValidator]],
      hour2: [""],
      weightMedium: ["", [decimalValidator]],
      hour3: [""],
      weightFinal: ["", [decimalValidator]],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
    this.store.select(SELECT_SAUSAGE_DATA).subscribe((tempSausage) => {
      if (tempSausage != null) {
        this.sausage = tempSausage;
        this.updateForm();
      }
    });
    this.store
      .select(SELECT_SAUSAGE_IS_SELECTED)
      .subscribe((selected) => (this.isSelected = selected));
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 4, step: !this.form.invalid }));
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
          this.registerSausage();
        },
      },
    ];

    if (
      this.form.valid &&
      (this.hour2.value == "" ||
        this.hour3.value == "" ||
        this.weightMedium.value == "" ||
        this.weightFinal.value == "")
    ) {
      this.alert.showAlert(
        "Infomacion",
        "Los campos opcionales también deberán ser guardados más adelante para poder cerrar el proceso",
        buttons
      );
    } else {
      this.registerSausage();
    }
  }

  onSubmitDate() {
    const { hour2, hour3, weightMedium, weightFinal } = this.form.value;
    if (this.optionalMedium) {
      this.store.dispatch(
        sausageStartRegisterDateAndWeigth({
          hour: {
            hour: moment(hour2).format("HH:mm"),
            weight: weightMedium,
          },
        })
      );
    } else if (this.optionalFinal) {
      this.store.dispatch(
        sausageStartRegisterDateAndWeigth({
          hour: {
            hour: moment(hour3).format("HH:mm"),
            weight: weightFinal,
          },
        })
      );
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

  updateForm() {
    const { product, time, ...value } = this.sausage;

    this.optionalMedium = time.hour2 === "" && time.weightMedium <= 0;
    this.optionalFinal = time.hour3 !== "" && time.weightFinal > 0;

    this.form.patchValue({
      ...value,
      productId: product.description,
      hour1: time.hour1,
      hour2: time.hour2,
      hour3: time.hour3,
      weightInitial: time.weightInitial,
      weightMedium: time.weightMedium,
      weightFinal: time.weightFinal,
    });
  }

  get productId() {
    return this.form.get("productId");
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
