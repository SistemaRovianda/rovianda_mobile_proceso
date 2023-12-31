import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_TENDERIZED = (state: AppState) => state.tenderized;

export const SELECT_TENDERIZED_DATA = createSelector(
  SELECT_TENDERIZED,
  (state) => state.tenderizeds
);

export const SELECT_TENDERIZED_RESULT = createSelector(
  SELECT_TENDERIZED,
  (state) => state.result
);

export const SELECT_TENDERIZED_IS_LOADING = createSelector(
  SELECT_TENDERIZED,
  (state) => state.loading
);

export const SELECT_TENDERIZED_IS_SELECTED = createSelector(
  SELECT_TENDERIZED,
  (state) => state.isSelected
);

export const GET_FORMULATIONS_PENDING_TENDERIZED = createSelector(
  SELECT_TENDERIZED,
  (state)=>state.formulations
);

export const SELECT_TENDERIZED_PROCESS_METADATA = createSelector(
  SELECT_TENDERIZED,
  (state)=>state.processMetadata
)
