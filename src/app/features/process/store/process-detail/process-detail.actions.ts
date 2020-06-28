//const PROCESS_DETAIL = "[PROCESS DETAIL]";

import { createAction, props } from "@ngrx/store";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";

const PROCESS_DETAIL_START_LOAD_PRODUCTS =
  "[PROCESS DETAIL] Start Load Products";

const PROCESS_DETAIL_LOAD_PRODUCTS = "[PROCESS DETAIL] Load Products";

export const processDetailStartLoadProducts = createAction(
  PROCESS_DETAIL_START_LOAD_PRODUCTS
);

export const processDetailLoadProducts = createAction(
  PROCESS_DETAIL_LOAD_PRODUCTS,
  props<{ products: ProductCatalog[] }>()
);
