import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";

const SELECT_PROCESS_DETAIL = (state: AppState) => state.processDetail;

export const SELECT_PROCESS_DETAIL_PRODUCTS = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.products
);

export const SELECT_PROCESS_DETAIL_IS_LOADING = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.loading
);
