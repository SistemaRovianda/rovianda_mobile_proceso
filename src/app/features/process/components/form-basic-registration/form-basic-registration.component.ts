import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { stepperNextStep } from "../../store/stepper/stepper.action";
import { AlertService } from "src/app/shared/services/alert.service";

@Component({
  selector: "app-form-basic-registration",
  templateUrl: "./form-basic-registration.component.html",
  styleUrls: ["./form-basic-registration.component.scss"],
})
export class FormBasicRegistrationComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private alert: AlertService
  ) {
    this.form = fb.group({
      productId: ["", Validators.required],
      lotId: ["", Validators.required],
      weight: ["", Validators.required],
      temperature: ["", Validators.required],
      hourEntrance: [new Date().toISOString(), Validators.required],
      hourExit: [new Date().toISOString(), Validators.required],
      dateIni: [new Date().toISOString(), Validators.required],
      dateFinal: [""],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 0, step: !this.form.invalid }));
  }

  onSubmit() {
    if (this.dateFinal.value === "" && !this.form.invalid) {
      this.alert.showAlert(
        "Informacion",
        "Los campos opcionales, deberán igual ser llenados al salir la carne del descongelamiento",
        ["Aceptar"]
      );
    }
    const { lotId, dateIni, ...value } = this.form.value;
    console.log({ lotId, dateIni, ...value });
    this.submit.emit(dateIni);
  }

  get dateFinal() {
    return this.form.get("dateFinal");
  }
}
