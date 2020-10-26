import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_REPROCESSING = (state: AppState) => state.reprocessing;

export const SELECT_REPROCESSING_LIST_REPROCESSIG = createSelector(
  SELECT_REPROCESSING,
  (state) => state.listReprocessing
);

export const SELECT_REPROCESSING_IS_LOADING = createSelector(
  SELECT_REPROCESSING,
  (state) => state.loading
);

export const SELECT_FORMULATION_DETAILS = createSelector(
  SELECT_REPROCESSING,
  (state)=>state.formulationDetails
);