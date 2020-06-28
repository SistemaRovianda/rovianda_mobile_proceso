import { createReducer, on } from "@ngrx/store";
import * as fromRecentRecordsActions from "./recent-records.actions";
import * as fromBasicRegisterActions from "../basic-register/basic-register.actions";
import { RecentRecords } from "src/app/shared/models/recent-records.interface";

const STATE_INITIAL_RECENT_RECORDS: RecentRecords = {
  process: [],
  error: null,
  processSelected: null,
  isSelected: false,
};

export const recentRecordsReducer = createReducer(
  STATE_INITIAL_RECENT_RECORDS,
  on(
    fromRecentRecordsActions.recentRecordsLoadRecords,
    (state, { process }) => ({ ...state, process })
  ),
  on(
    fromRecentRecordsActions.recentRecordsLoadSelectProcess,
    (state, { processSelected }) => ({
      ...state,
      processSelected,
      isSelected: true,
    })
  ),
  on(fromRecentRecordsActions.recentRecordsLoadRecords, (state) => ({
    ...state,
    processSelected: null,
    isSelected: false,
  })),
  on(
    fromBasicRegisterActions.basicRegisterRegisterDefrostProcess,
    (state, { defrost }) => ({
      ...state,
      processSelected: {
        ...state.processSelected,
        end_date: defrost.dateFin,
        output_hour: defrost.hourExit,
      },
    })
  )
);
