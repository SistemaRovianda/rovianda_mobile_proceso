import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

export const SELECT_STEPPER = (state: AppState) => state.steps;

export const SELECT_STEPPER_STEPS = createSelector(
  SELECT_STEPPER,
  (state) => state.steps
);
