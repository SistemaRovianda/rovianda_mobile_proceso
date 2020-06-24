import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_TENDERIZED = (state: AppState) => state.tenderized;

export const SELECT_TENDERIZED_DATA = createSelector(
  SELECT_TENDERIZED,
  (state) => state.tenderized
);

export const SELECT_TENDERIZED_RESULT = createSelector(
  SELECT_TENDERIZED,
  (state) => state.result
);
