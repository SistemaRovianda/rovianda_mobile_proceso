import { createReducer, on } from "@ngrx/store";
import { TenderizedInterface } from "src/app/shared/models/tenderized-page.interface";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";
import * as fromTenderizedActions from "./tenderized.actions";
const STATE_INITIAL_CONDITIONING: TenderizedInterface = {
  tenderized: null,
  result: false,
  error: null,
  isSelected: false,
  loading: false,
};

export const tenderizedReducer = createReducer(
  STATE_INITIAL_CONDITIONING,
  on(fromTenderizedActions.tenderizedLoadData, (state, { tenderized }) => ({
    ...state,
    tenderized
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_CONDITIONING
  ),
  on(fromTenderizedActions.tenderizedRegister, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromTenderizedActions.tenderizedRegisterResults, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromTenderizedActions.tenderizedRegisterFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(fromTenderizedActions.tenderizedRegisterFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromTenderizedActions.tenderizedIsSelected, (state, { isSelected }) => ({
    ...state,
    isSelected,
  }))
);
