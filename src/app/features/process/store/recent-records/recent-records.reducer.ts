import { createReducer, on } from "@ngrx/store";
import * as fromRecentRecordsActions from "./recent-records.actions";
import * as fromBasicRegisterActions from "../basic-register/basic-register.actions";
import { RecentRecords } from "src/app/shared/models/recent-records.interface";

const STATE_INITIAL_RECENT_RECORDS: RecentRecords = {
  process: [],
  error: null,
  processSelected: null,
  isSelected: false,
  isNewRegister: false,
  newRegisterProcessSuccess: false,
  path: "/process/process-detail",
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
    newRegisterProcessSuccess: false,
    path: "/process/process-detail",
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
  ),
  on(
    fromRecentRecordsActions.recentRecordsLoadTypeRegister,
    (state, { isNewRegister, path }) => ({
      ...state,
      isNewRegister,
      path,
    })
  ),
  on(fromRecentRecordsActions.recentRecordsCreateProcessSuccess, (state) => ({
    ...state,
    newRegisterProcessSuccess: true,
  }))
);
