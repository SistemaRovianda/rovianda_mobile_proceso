import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_CONDITIONING = (state: AppState) => state.conditioning;

export const SELECT_CONDITIONING_DATA = createSelector(
  SELECT_CONDITIONING,
  (state) => state.conditioning
);

export const SELECT_CONDITIONING_RESULT = createSelector(
  SELECT_CONDITIONING,
  (state) => state.result
);
