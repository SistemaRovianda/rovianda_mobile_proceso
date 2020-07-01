import { createReducer, on } from "@ngrx/store";
import { ProcessDetail } from "src/app/shared/models/process-detail-page.interface";
import * as fromProcessDetailActions from "./process-detail.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";

const STATE_PROCESS_DETAIL_INITIAL: ProcessDetail = {
  products: [],
  error: null,
  loading: false,
};

export const processDetailReducer = createReducer(
  STATE_PROCESS_DETAIL_INITIAL,
  on(
    fromProcessDetailActions.processDetailLoadProducts,
    (state, { products }) => ({ ...state, products })
  ),
  on(fromProcessDetailActions.processDetailStartCloseProcess, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    fromProcessDetailActions.processDetailCloseProcessFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(fromProcessDetailActions.processDetailCloseProcessFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_PROCESS_DETAIL_INITIAL
  )
);
