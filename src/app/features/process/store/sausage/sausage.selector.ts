import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_SAUSAGE = (state: AppState) => state.sausage;

export const SELECT_SAUSAGE_DATA = createSelector(
  SELECT_SAUSAGE,
  (state) => state.sausage
);

export const SELECT_SAUSAGE_RESULT = createSelector(
  SELECT_SAUSAGE,
  (state) => state.result
);

export const SELECT_SAUSAGE_IS_LOADING = createSelector(
  SELECT_SAUSAGE,
  (state) => state.loading
);

export const SELECT_SAUSAGE_IS_SELECTED = createSelector(
  SELECT_SAUSAGE,
  (state) => state.isSelected
);
