import { createReducer, on } from "@ngrx/store";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";
import * as fromSausageActions from "./sausage.actions";
import { SausageInterface } from "src/app/shared/models/sausage-page.interface";

const STATE_INITIAL_SAUSAGE: SausageInterface = {
  sausage: null,
  result: false,
};

export const sausageReducer = createReducer(
  STATE_INITIAL_SAUSAGE,
  on(fromSausageActions.sausageLoadData, (state, { sausage }) => ({
    ...state,
    sausage,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_SAUSAGE
  ),
  on(fromSausageActions.sausageRegisterResults, (state, { result }) => ({
    ...state,
    result,
  }))
);
