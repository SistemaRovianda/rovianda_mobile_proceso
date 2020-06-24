import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { Tenderized } from "src/app/shared/models/tenderized.interface";
import { SELECT_TENDERIZED_DATA } from "../../store/tenderized/tenderized.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { tenderizedRegister } from "../../store/tenderized/tenderized.actions";

@Component({
  selector: "app-form-tenderized",
  templateUrl: "./form-tenderized.component.html",
  styleUrls: ["./form-tenderized.component.scss"],
})
export class FormTenderizedComponent implements OnInit {
  tenderized: Tenderized;

  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = this.fb.group({
      productId: ["", Validators.required],
      temperature: ["", Validators.required],
      weight: ["", Validators.required],
      weightSalmuera: ["", Validators.required],
      percentage: ["", Validators.required],
      date: [new Date().toISOString(), Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
    this.store.select(SELECT_TENDERIZED_DATA).subscribe((tempTenderized) => {
      if (tempTenderized != null) {
        this.tenderized = tempTenderized;
        this.updateForm();
      }
    });
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 3, step: !this.form.invalid }));
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
    if (this.form.valid) {
      this.alert.showAlert(
        "Informacion",
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
    const { ...value } = this.tenderized;
    this.form.patchValue({
      ...value,
    });
  }
}
