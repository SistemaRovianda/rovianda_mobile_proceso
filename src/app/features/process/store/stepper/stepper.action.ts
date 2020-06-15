import { createAction, props } from "@ngrx/store";

const STEPPER_INITIAL_STATE = "[STEPPER] Initial State";

const STEPPER_NEXT_STEP = "[STEPPER] Next Step";

const STEPPER_PREV_STEP = "[STEPPER] Prev Step";

const STEPPER_LOAD_STEP = "[STEPPER] Load Step";

export const stepperInitialState = createAction(STEPPER_INITIAL_STATE);

export const stepperNextStep = createAction(
  STEPPER_NEXT_STEP,
  props<{ num: number; step: boolean }>()
);

export const stepperPrevStep = createAction(STEPPER_PREV_STEP);
