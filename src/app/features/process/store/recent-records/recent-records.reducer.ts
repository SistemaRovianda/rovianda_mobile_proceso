import { createReducer, on } from "@ngrx/store";
import * as fromRecentRecordsActions from "./recent-records.actions";
import { RecentRecords } from "src/app/shared/models/recent-records.interface";

const STATE_INITIAL_RECENT_RECORDS: RecentRecords = {
  process: [],
  error: null,
  processSelected: null,
};

export const recentRecordsReducer = createReducer(
  STATE_INITIAL_RECENT_RECORDS,
  on(
    fromRecentRecordsActions.recentRecordsLoadRecords,
    (state, { process }) => ({ ...state, process })
  ),
  on(
    fromRecentRecordsActions.recentRecordsLoadSelectProcess,
    (state, { processSelected }) => ({ ...state, processSelected })
  ),
  on(fromRecentRecordsActions.recentRecordsLoadRecords, (state) => ({
    ...state,
    processSelected: null,
  }))
);
