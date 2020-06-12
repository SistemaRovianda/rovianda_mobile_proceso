import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_GRINDING = (state: AppState) => state.grinding;

export const SELECT_GRINDING_DATA = createSelector(
  SELECT_GRINDING,
  (state) => state.grinding
);

export const SELECT_GRINDING_RESULT = createSelector(
  SELECT_GRINDING,
  (state) => state.result
);
