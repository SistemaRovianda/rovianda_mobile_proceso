import { UserInterface } from "src/app/shared/models/user.interface";
import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_USER = (state: AppState) => state.user;

export const SELECT_USER_DATA = createSelector(
  SELECT_USER,
  (state) => state.user
);

export const SELECT_USER_RESULT = createSelector(
  SELECT_USER,
  (state) => state.isSelected
);

export const SELECT_USER_IS_LOADING = createSelector(
  SELECT_USER,
  (state) => state.loading
);

export const SELECT_USER_IS_SELECTED = createSelector(
  SELECT_USER,
  (state) => state.isSelected
);

export const SELECT_USERS = createSelector(SELECT_USER, (state) => state.users);
