import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";
import { stepperNextStep } from "../../store/stepper/stepper.action";

@Component({
  selector: "app-form-users",
  templateUrl: "./form-users.component.html",
  styleUrls: ["./form-users.component.scss"],
})
export class FormUsersComponent implements OnInit {
  form: FormGroup;

  @Output("onSubmit") submit = new EventEmitter();

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      nameElaborated: ["", Validators.required],
      jobElaborated: ["", Validators.required],
      nameVerify: ["", Validators.required],
      jobVerify: ["", Validators.required],
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
