import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_BASIC_REGISTER = (state: AppState) => state.basicRegister;

export const SELECT_BASIC_REGISTER_STATE = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.status
);

export const SELECT_BASIC_REGISTER_LOTS = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.lots
);

export const SELECT_BASIC_REGISTER_RESULT = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.result
);

export const SELECT_BASIC_REGISTER_MATERIALS = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.materials
);

export const SELECT_BASIC_REGISTER_IS_LOADING = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.loading
);
