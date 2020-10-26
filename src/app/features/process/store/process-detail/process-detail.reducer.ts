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
  formulations:[],
  productsRovianda: [],
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

  processId:number,
  formulationId:number,
  productName:string,
  lotDay:string
  sausage:boolean,
  tenderized:boolean,
  conditioning:boolean,
  grinding:boolean
  // loteInterno:string;
  // outputLotRecordId:number;
  // createAt:string;
  // currentProces:string;
  // temperature:string;
  // weigth:number;
  // entranceHour:string;
  // outputHour:string;
  // startDate:string;
  // endDate:string;
  // rawMaterialName:string;
}
const initValueProcessMetadata:ProcessMetadata =null;
export const processMetadataReducer = createReducer<ProcessMetadata>(initValueProcessMetadata,
  on(setProcessDetails,(state,{process})=>({...process}))
  );