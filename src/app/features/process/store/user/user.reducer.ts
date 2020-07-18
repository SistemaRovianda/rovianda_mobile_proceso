import { UserPageInterface } from "src/app/shared/models/user-page.interfac";
import { createReducer, on } from "@ngrx/store";
import * as fromUserActions from "./user.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";
const STATE_INITIAL_USER: UserPageInterface = {
  error: null,
  isSelected: false,
  loading: false,
  result: false,
  user: null,
  users: [],
};

export const userReducer = createReducer(
  STATE_INITIAL_USER,
  on(fromUserActions.userLoadData, (state, { user }) => ({ ...state, user })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_USER
  ),
  on(fromUserActions.userRegister, (state) => ({ ...state, loading: true })),
  on(fromUserActions.userRegisterResult, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromUserActions.userRegisterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromUserActions.userIsSelected, (state, { isSelected }) => ({
    ...state,
    isSelected,
  })),
  on(fromUserActions.userLoadUsers, (state, { users }) => ({
    ...state,
    users,
  })),
  on(fromUserActions.userRegisterFinish, (state) => ({
    ...state,
    loading: false,
  }))
);
