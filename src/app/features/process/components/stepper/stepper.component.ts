import { Component, OnInit } from "@angular/core";
import { Stepper, Step } from "src/app/shared/models/stepper.interface";
import { AppState } from "src/app/shared/models/store.state.interface";
import { Store } from "@ngrx/store";
import { SELECT_STEPPER, SELECT_STEPPER_STEPS } from "../../store/stepper/stepper.select";

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"],
})
export class StepperComponent implements OnInit {
  steppers: Step[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(SELECT_STEPPER_STEPS)
      .subscribe((tempStepper) => (this.steppers = tempStepper));
  }
}
