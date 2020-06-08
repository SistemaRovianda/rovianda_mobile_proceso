import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const AUTHENTICATION_STATE = (state: AppState) => state.auth;

export const SELECT_USER_TOKEN = createSelector(
  AUTHENTICATION_STATE,
  (state) => state.token
);

export const SELECT_USER_UID = createSelector(
  AUTHENTICATION_STATE,
  (state) => state.uid
);

export const SELECT_USER_ROLE = createSelector(
  AUTHENTICATION_STATE,
  (state) => state.rol
);

export const SELECT_USER_CURRENT_TOKEN = createSelector(
  AUTHENTICATION_STATE,
  (state) => state.currentToken
);
