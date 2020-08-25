import { ConditioningInterface } from "src/app/shared/models/conditioning-page.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromConditioningActions from "./conditioning.actions";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";

const STATE_INITIAL_CONDITIONING: ConditioningInterface = {
  conditioning: null,
  error: null,
  result: false,
  isSelected: false,
  loading: false,
};

export const conditioningReducer = createReducer(
  STATE_INITIAL_CONDITIONING,
  on(
    fromConditioningActions.conditioningLoadData,
    (state, { conditioning }) => ({ ...state, conditioning })
  ),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_CONDITIONING
  ),
  on(fromConditioningActions.conditioningRegister, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    fromConditioningActions.conditioningRegisterResults,
    (state, { result }) => ({ ...state, result })
  ),
  on(
    fromConditioningActions.conditioningRegisterFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(fromConditioningActions.conditioningRegisterFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    fromConditioningActions.conditioningIsSelected,
    (state, { isSelected }) => ({ ...state, isSelected })
  ),
  on(fromRecentRecordsActions.recentRecordsCreateNewProcess, (state) => ({
    ...state,
    loading: true,
  }))
);
