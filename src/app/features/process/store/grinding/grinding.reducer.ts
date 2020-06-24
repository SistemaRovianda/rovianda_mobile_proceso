import * as fromGrindingActions from "./grinding.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";
import { GrindingPageInterface } from "src/app/shared/models/grinding-page.interface";
import { createReducer, on } from "@ngrx/store";

const STATE_INITIAL_GRINDING: GrindingPageInterface = {
  grinding: null,
  result: false,
};

export const grindingReducer = createReducer(
  STATE_INITIAL_GRINDING,
  on(fromGrindingActions.grindingLoadData, (state, { grinding }) => ({
    ...state,
    grinding,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_GRINDING
  ),
  on(fromGrindingActions.grindingRegisterResult, (state, { result }) => ({
    ...state,
    result,
  }))
);
