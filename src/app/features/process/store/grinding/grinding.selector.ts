import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_GRINDING = (state: AppState) => state.grinding;

export const SELECT_GRINDING_DATA = createSelector(
  SELECT_GRINDING,
  (state) => state.grindings
);

export const SELECT_GRINDING_RESULT = createSelector(
  SELECT_GRINDING,
  (state) => state.result
);

export const SELECT_GRINDING_IS_SELECTED = createSelector(
  SELECT_GRINDING,
  (state) => state.isSelected
);

export const SELECT_GRINDING_IS_LOADING = createSelector(
  SELECT_GRINDING,
  (state) => state.loading
);

export const SELECT_GRINDING_FORMULATIONS = createSelector(
  SELECT_GRINDING,
  (state)=>state.formulations
)

export const SELECT_GRINDING_PROCESS_METADATA = createSelector(
  SELECT_GRINDING,
  (state)=>state.processMetadata
)