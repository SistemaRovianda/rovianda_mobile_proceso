import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_BASIC_REGISTER = (state: AppState) => state.basicRegister;

export const SELECT_BASIC_REGISTER_STATE = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.status
);

export const SELECT_BASIC_FORMULATIONS = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.formulations
);

export const SELECT_BASIC_REGISTER_RESULT = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.result
);

export const SELECT_BASIC_REGISTER_IS_LOADING = createSelector(
  SELECT_BASIC_REGISTER,
  (state) => state.loading
);

export const SELECT_CURRENT_PROCESS = createSelector(
  SELECT_BASIC_REGISTER,(state)=>state.currentProcess
);
