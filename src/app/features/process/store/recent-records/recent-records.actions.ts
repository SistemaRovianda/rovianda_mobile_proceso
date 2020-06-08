import { createAction, props } from "@ngrx/store";
import { Process } from "src/app/shared/models/process.interface";

const RECENT_RECORDS_START_LOAD = "[RECENT RECORDS] Start Load";

const RECENT_RECORDS_LOAD_RECORDS = "[RECENT RECORDS] Load Records";

const RECENT_RECORDS_LOAD_RECORDS_SUCCESS =
  "[RECENT RECORDS] Load Records Success";

const RECENT_RECORDS_LOAD_FAILURE = "[RECENT RECORDS] Load Records Failure";

const RECENT_RECORDS_LOAD_SELECT_PROCESS =
  "[RECENT RECORDS] Load Select Process";

export const recentRecordsStartLoad = createAction(
  RECENT_RECORDS_START_LOAD,
  props<{ status: string }>()
);

export const recentRecordsLoadRecords = createAction(
  RECENT_RECORDS_LOAD_RECORDS,
  props<{ process: Process[] }>()
);

export const recentRecordsLoadRecordsSuccess = createAction(
  RECENT_RECORDS_LOAD_RECORDS_SUCCESS
);

export const recentRecordsLoadFailure = createAction(
  RECENT_RECORDS_LOAD_FAILURE,
  props<{ error: string }>()
);

export const recentRecordsLoadSelectProcess = createAction(
  RECENT_RECORDS_LOAD_SELECT_PROCESS,
  props<{ processSelected: Process }>()
);
