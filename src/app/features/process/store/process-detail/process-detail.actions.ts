//const PROCESS_DETAIL = "[PROCESS DETAIL]";

import { createAction, props } from "@ngrx/store";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";

const PROCESS_DETAIL_START_LOAD_PRODUCTS =
  "[PROCESS DETAIL] Start Load Products";

const PROCESS_DETAIL_LOAD_PRODUCTS = "[PROCESS DETAIL] Load Products";

const PROCESS_DETAIL_START_CLOSE_PROCESS =
  "[PROCESS DETAIL] Start  Close Process";

const PROCESS_DETAIL_CLOSE_PROCESS_SUCCESS =
  "[PROCESS DETAIL] Close Process Success";

const PROCESS_DETAIL_CLOSE_PROCESS_FINISH =
  "[PROCESS DETAIL] Close Process Finish";

const PROCESS_DETAIL_CLOSE_PROCESS_FAILURE =
  "[PROCESS DETAIL] Close Process Failure";

export const processDetailStartLoadProducts = createAction(
  PROCESS_DETAIL_START_LOAD_PRODUCTS
);

export const processDetailLoadProducts = createAction(
  PROCESS_DETAIL_LOAD_PRODUCTS,
  props<{ products: ProductCatalog[] }>()
);

export const processDetailStartCloseProcess = createAction(
  PROCESS_DETAIL_START_CLOSE_PROCESS
);

export const processDetailCloseProcessSuccess = createAction(
  PROCESS_DETAIL_CLOSE_PROCESS_SUCCESS
);

export const processDetailCloseProcessFinish = createAction(
  PROCESS_DETAIL_CLOSE_PROCESS_FINISH
);

export const processDetailCloseProcessFailure = createAction(
  PROCESS_DETAIL_CLOSE_PROCESS_FAILURE,
  props<{ error: string }>()
);
