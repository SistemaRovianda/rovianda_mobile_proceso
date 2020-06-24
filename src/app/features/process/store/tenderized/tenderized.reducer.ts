import { createReducer, on } from "@ngrx/store";
import { TenderizedInterface } from "src/app/shared/models/tenderized-page.interface";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";
import * as fromTenderizedActions from "./tenderized.actions";
const STATE_INITIAL_CONDITIONING: TenderizedInterface = {
  tenderized: null,
  result: false,
};

export const tenderizedReducer = createReducer(
  STATE_INITIAL_CONDITIONING,
  on(
    fromTenderizedActions.tenderizedLoadData,
    (state, { tenderized }) => ({ ...state, tenderized })
  ),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_CONDITIONING
  ),
  on(
    fromTenderizedActions.tenderizedRegisterResults,
    (state, { result }) => ({ ...state, result })
  )
);
