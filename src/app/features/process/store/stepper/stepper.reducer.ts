import * as fromStepperActions from "./stepper.action";
import { Stepper } from "src/app/shared/models/stepper.interface";
import { createReducer, on } from "@ngrx/store";

const STEPPER_STATE_INITIAL: Stepper = {
  steps: [
    {
      value: false,
    },
    {
      value: false,
    },
    {
      value: false,
    },
    {
      value: false,
    },
    {
      value: false,
    },
    {
      value: false,
    },
  ],
};
export const StepperReducer = createReducer<Stepper>(
  STEPPER_STATE_INITIAL,
  on(fromStepperActions.stepperNextStep, (state, { num, step }) => ({
    ...state,
    steps: state.steps.concat().map((tempStep, i) => {
      if (i === num) {
        return { value: step };
      }
      return tempStep;
    }),
  })),
  on(fromStepperActions.stepperPrevStep, (state) => ({
    ...state,
    steps: state.steps.slice(1).concat({ value: false }),
  })),
  on(fromStepperActions.stepperInitialState, (state) => STEPPER_STATE_INITIAL)
);
