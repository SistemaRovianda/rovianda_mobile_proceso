import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { stepperNextStep } from "../../store/stepper/stepper.action";

@Component({
  selector: "app-form-sausage",
  templateUrl: "./form-sausage.component.html",
  styleUrls: ["./form-sausage.component.scss"],
})
export class FormSausageComponent implements OnInit {
  form: FormGroup;

  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      productId: ["", Validators.required],
      temperature: ["", Validators.required],
      date: [new Date().toISOString, Validators.required],
      hour1: [new Date().toISOString(), Validators.required],
      weightInitial: ["", Validators.required],
      hour2: [new Date().toISOString(), Validators.required],
      weightMedium: ["", Validators.required],
      hour3: [new Date().toISOString(), Validators.required],
      weightFinal: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((_) => this.checkValues());
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 0, step: !this.form.invalid }));
  }
  onSubmit() {
    console.log(this.form);
  }
}
