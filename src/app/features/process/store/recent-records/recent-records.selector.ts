import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_RECENT_RECORDS = (state: AppState) => state.recentRecords;

export const SELECT_RECENT_RECORDS_PROCESS = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.process
);

export const SELECT_RECENT_RECORDS_ERROR = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.error
);

export const SELECT_RECENT_RECORDS_PROCESS_SELECTED = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.processSelected
);
