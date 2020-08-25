import { AppState } from "src/app/shared/models/store.state.interface";
import { createSelector } from "@ngrx/store";
import { create } from "domain";

const SELECT_PROCESS_DETAIL = (state: AppState) => state.processDetail;

export const SELECT_PROCESS_DETAIL_PRODUCTS = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.products
);

export const SELECT_PROCESS_DETAIL_IS_LOADING = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.loading
);

export const SELECT_PROCESS_DETAIL_MATERIALS = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.materials
);

export const SELECT_PROCESS_DETAIL_PRODUCTS_ROVIANDA = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.productsRovianda
);

export const SELECT_PROCESS_DETAIL_LOTS_MEAT = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.lotsMeatProcess
);

export const SELECT_PROCESS_DETAIL_SECTION = createSelector(
  SELECT_PROCESS_DETAIL,
  (state) => state.section
);

const PROCESS_METADATA =(state:AppState)=>state.processMetadata;
export const SELECT_PROCESS_METADATA =createSelector(PROCESS_METADATA,(state)=>state);
