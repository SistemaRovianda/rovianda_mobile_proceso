import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";

@Component({
  selector: "app-form-grinding",
  templateUrl: "./form-grinding.component.html",
  styleUrls: ["./form-grinding.component.scss"],
})
export class FormGrindingComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      rawMaterial: ["", Validators.required],
      process: ["", Validators.required],
      weight: ["", Validators.required],
      date: [new Date().toISOString()],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 1, step: !this.form.invalid }));
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
