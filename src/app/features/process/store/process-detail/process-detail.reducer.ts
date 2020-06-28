import { createReducer, on } from "@ngrx/store";
import { ProcessDetail } from "src/app/shared/models/process-detail-page.interface";
import * as fromProcessDetailActions from "./process-detail.actions";
const STATE_PROCESS_DETAIL_INITIAL: ProcessDetail = {
  products: [],
};

export const processDetailReducer = createReducer(
  STATE_PROCESS_DETAIL_INITIAL,
  on(
    fromProcessDetailActions.processDetailLoadProducts,
    (state, { products }) => ({ ...state, products })
  )
);
