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

export const SELECT_RECENT_RECORDS_PROCESS_PROCESS_ID = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.processSelected.id
);

export const SELECT_RECENT_RECORDS_IS_SELECTED_PROCESS = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.isSelected
);

export const SELECT_RECENT_RECORDS_IS_NEW_REGISTER = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.isNewRegister
);

export const SELECT_RECENT_RECORDS_PROCESS_SUCCESS = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.newRegisterProcessSuccess
);

export const SELECT_RECENT_RECORDS_PATH = createSelector(
  SELECT_RECENT_RECORDS,
  (state) => state.path
);
