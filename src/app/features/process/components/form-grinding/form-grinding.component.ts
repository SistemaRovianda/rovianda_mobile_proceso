import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { Grinding } from "src/app/shared/models/grinding.interface";
import { SELECT_GRINDING_DATA } from "../../store/grinding/grinding.selector";
import { AlertService } from "src/app/shared/services/alert.service";
import * as moment from "moment";
import { grindingRegister } from "../../store/grinding/grinding.actions";

@Component({
  selector: "app-form-grinding",
  templateUrl: "./form-grinding.component.html",
  styleUrls: ["./form-grinding.component.scss"],
})
export class FormGrindingComponent implements OnInit {
  grinding: Grinding;

  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      rawMaterial: ["", Validators.required],
      process: ["", Validators.required],
      weight: ["", Validators.required],
      date: [new Date().toISOString()],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
    this.store.select(SELECT_GRINDING_DATA).subscribe((tempGrinding) => {
      if (tempGrinding != null) {
        this.grinding = tempGrinding;
        this.updateForm();
      }
    });
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
          this.registerGrinding();
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

  registerGrinding() {
    const { date, ...values } = this.form.value;
    this.store.dispatch(
      grindingRegister({ date: moment(date).format("YYYY-MM-DD"), ...values })
    );
  }

  updateForm() {
    const { ...values } = this.grinding;

    this.form.patchValue({ ...values });
  }
}
