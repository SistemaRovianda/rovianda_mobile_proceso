import { createReducer, on } from "@ngrx/store";
import { ProcessDetail } from "src/app/shared/models/process-detail-page.interface";
import * as fromProcessDetailActions from "./process-detail.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";
import { Process } from 'src/app/shared/models/process.interface';
import { setProcessDetails } from './process-detail.actions';

const STATE_PROCESS_DETAIL_INITIAL: ProcessDetail = {
  products: [],
  error: null,
  loading: false,
  materials: [],
  productsRovianda: [],
  lotsMeatProcess: [],
  section: { name: "", path: "", section: "" },
};


export const processDetailReducer = createReducer(
  STATE_PROCESS_DETAIL_INITIAL,
  on(
    fromProcessDetailActions.processDetailLoadProducts,
    (state, { products }) => ({ ...state, products })
  ),
  on(fromProcessDetailActions.processDetailStartCloseProcess, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    fromProcessDetailActions.processDetailCloseProcessFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(fromProcessDetailActions.processDetailCloseProcessFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_PROCESS_DETAIL_INITIAL
  ),
  on(
    fromProcessDetailActions.processDetailLoadMaterials,
    (state, { materials }) => ({ ...state, materials })
  ),
  on(
    fromProcessDetailActions.processDetailLoadProductsRovianda,
    (state, { productsRovianda }) => ({ ...state, productsRovianda })
  ),
  on(
    fromProcessDetailActions.processDetailLoadLotsMeatProcess,
    (state, { lotsMeatProcess }) => ({ ...state, lotsMeatProcess })
  ),
  on(
    fromProcessDetailActions.processDetailLoadSection,
    (state, { section }) => ({ ...state, section })
  )
);

export interface ProcessMetadata{
  loteInterno:string;
  outputLotRecordId:number;
}
const initValueProcessMetadata:ProcessMetadata =null;
export const processMetadataReducer = createReducer<ProcessMetadata>(initValueProcessMetadata,
  on(setProcessDetails,(state,{process})=>({...process})));