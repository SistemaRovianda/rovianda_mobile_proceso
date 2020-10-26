import { createReducer, on } from "@ngrx/store";
import { TenderizedInterface } from "src/app/shared/models/tenderized-page.interface";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";
import * as fromTenderizedActions from "./tenderized.actions";
import { setFormulationsByProductRovianda } from './tenderized.actions';
const STATE_INITIAL_CONDITIONING: TenderizedInterface = {
  tenderizeds: [],
  result: false,
  error: null,
  isSelected: false,
  loading: false,
  formulations:[],
  processMetadata:null
};

export const tenderizedReducer = createReducer(
  STATE_INITIAL_CONDITIONING,
  on(fromTenderizedActions.tenderizedLoadData, (state, { tenderizeds }) => ({
    ...state,
    tenderizeds,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_CONDITIONING
  ),
  on(fromTenderizedActions.tenderizedRegister, (state) => ({
    ...state,
    loading: true,
  })),
  on(setFormulationsByProductRovianda,(state,{formulations})=>({...state,formulations})),
  on(fromTenderizedActions.tenderizedRegisterResults, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromTenderizedActions.tenderizedRegisterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromTenderizedActions.tenderizedRegisterFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromTenderizedActions.tenderizedIsSelected, (state, { isSelected }) => ({
    ...state,
    isSelected,
  })),
  on(fromRecentRecordsActions.recentRecordsCreateNewProcess, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromTenderizedActions.setTenderizedProcessMetadata,(state,{process})=>({...state,processMetadata:process}))
);
