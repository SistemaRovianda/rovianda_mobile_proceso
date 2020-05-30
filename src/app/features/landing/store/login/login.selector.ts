import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/store.state.interface";

const SELECT_LOGIN = (state: AppState) => state.login;

export const SELECT_IS_LOADING = createSelector(
  SELECT_LOGIN,
  (state) => state.loading
);

export const SELECT_LOGIN_ERROR = createSelector(
  SELECT_LOGIN,
  (state) => state.error
);
