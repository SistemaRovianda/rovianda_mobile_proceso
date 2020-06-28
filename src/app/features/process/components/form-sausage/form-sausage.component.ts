import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { Sausage } from "src/app/shared/models/sausage.interface";
import { SELECT_SAUSAGE_DATA } from "../../store/sausage/sausage.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { sausageRegister } from "../../store/sausage/sausage.actions";
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

  registerSausage() {
    const {
      date,
      hour1,
      hour2,
      hour3,
      weightFinal,
      weightInitial,
      weightMedium,
      ...values
    } = this.form.value;

    this.store.dispatch(
      sausageRegister({
        ...values,
        date: moment(date).format("YYYY-MM-DD"),
        time: {
          hour1: moment(hour1).format("HH-MM"),
          hour2: hour2 !== "" ? moment(hour2).format("HH-MM") : "",
          hour3: hour3 !== "" ? moment(hour3).format("HH-MM") : "",
          weightFinal,
          weightInitial,
          weightMedium,
        },
      })
    );
  }

  updateForm() {
    const { time, ...value } = this.sausage;
    this.form.patchValue({
      ...value,
      hour1: time.hour1,
      hour2: time.hour2,
      hour3: time.hour3,
      weightInitial: time.weightInitial,
      weightMedium: time.weightMedium,
      weightFinal: time.weightFinal,
    });
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
}
