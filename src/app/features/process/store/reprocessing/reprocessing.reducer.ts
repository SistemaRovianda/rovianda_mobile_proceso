import { ProcessReprocessing } from "src/app/shared/models/process-reprocessing.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromReprocessingActions from "./reprocessing.action";

const STATE_INITIAL_PROCESSING: ProcessReprocessing = {
  error: null,
  listReprocessing: [],
  loading: false,
};

export const reprocessingReducer = createReducer(
  STATE_INITIAL_PROCESSING,
  on(
    fromReprocessingActions.reprocessingLoadListOfListReprocessing,
    (state, { listReprocessing }) => ({ ...state, listReprocessing })
  ),
  on(fromReprocessingActions.reprocessingStartReprocessing, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromReprocessingActions.reprocessigFinish, (state) => ({
    ...state,
    loading: false,
  }))
);
