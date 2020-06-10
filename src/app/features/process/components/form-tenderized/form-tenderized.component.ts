import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";

@Component({
  selector: "app-form-tenderized",
  templateUrl: "./form-tenderized.component.html",
  styleUrls: ["./form-tenderized.component.scss"],
})
export class FormTenderizedComponent implements OnInit {
  form: FormGroup;
  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
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
  }

  checkValues() {
    this.store.dispatch(stepperNextStep({ num: 1, step: !this.form.invalid }));
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
