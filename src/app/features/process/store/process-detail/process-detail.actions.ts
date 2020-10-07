import { createAction, props } from "@ngrx/store";
import { ProductCatalog } from "src/app/shared/models/product-catalog.interface";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { RawMaterial } from "src/app/shared/models/raw-material.interface";
import { ProcessLotMeat } from "src/app/shared/models/procces-lot-meat.interface";
import { MenuButton } from "src/app/shared/models/menu-button.interface";
import { Process } from 'src/app/shared/models/process.interface';
import { ProcessMetadata } from './process-detail.reducer';


const PROCESS_DETAIL_START_LOAD_PRODUCTS =
  "[PROCESS DETAIL] Start Load Products";

const PROCESS_DETAIL_LOAD_PRODUCTS = "[PROCESS DETAIL] Load Products";

const PROCESS_DETAIL_START_LOAD_PRODUCTS_ROVIANDA =
  "[PROCESS DETAIL] Start Load Products Rovianda";

const PROCESS_DETAIL_LOAD_PRODUCTS_ROVIANDA =
  "[PROCESS DETAIL] Load Products Rovianda";

const PROCESS_DETAIL_START_CLOSE_PROCESS =
  "[PROCESS DETAIL] Start  Close Process";

const PROCESS_DETAIL_CLOSE_PROCESS_SUCCESS =
  "[PROCESS DETAIL] Close Process Success";

const PROCESS_DETAIL_CLOSE_PROCESS_FINISH =
  "[PROCESS DETAIL] Close Process Finish";

const PROCESS_DETAIL_CLOSE_PROCESS_FAILURE =
  "[PROCESS DETAIL] Close Process Failure";

const PROCESS_DETAIL_START_LOAD_FORMULATIONS =
  "[PROCESS DETAIL] Start Load Formulations";

const PROCESS_DETAIL_LOAD_FORMULATIONS = "[PROCESS DETAIL] Load Formulations";

const PROCESS_DETAIL_START_LOAD_LOTS_MEAT_PROCESS =
  "[PROCESS DETAIL] Start Load Lots Meat Process";

const PROCESS_DETAIL_LOAD_LOTS_MEAT_PROCESS =
  "[PROCESS DETAIL] Load Lots Meat Process ";

const PROCESS_DETAIL_LOAD_SECTION = "[PROCESS DETAIL] Load Section";

export const processDetailStartLoadProducts = createAction(
  PROCESS_DETAIL_START_LOAD_PRODUCTS
);

export const processDetailLoadProducts = createAction(
  PROCESS_DETAIL_LOAD_PRODUCTS,
  props<{ products: ProductCatalog[] }>()
);

export const processDetailStartLoadProductsRovianda = createAction(
  PROCESS_DETAIL_START_LOAD_PRODUCTS_ROVIANDA
);

export const processDetailLoadProductsRovianda = createAction(
  PROCESS_DETAIL_LOAD_PRODUCTS_ROVIANDA,
  props<{ productsRovianda: ProductsRovianda[] }>()
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


export const processDetailStartLoadLotsMeatProcess = createAction(
  PROCESS_DETAIL_START_LOAD_LOTS_MEAT_PROCESS
);

export const processDetailLoadLotsMeatProcess = createAction(
  PROCESS_DETAIL_LOAD_LOTS_MEAT_PROCESS,
  props<{ lotsMeatProcess: ProcessLotMeat[] }>()
);

export const processDetailLoadSection = createAction(
  PROCESS_DETAIL_LOAD_SECTION,
  props<{ section: MenuButton }>()
);

export const getProcessDetails = createAction("[PROCESS], getting process details");
export const setProcessDetails = createAction("[PROCESS], setting process details",props<{process:ProcessMetadata}>());
