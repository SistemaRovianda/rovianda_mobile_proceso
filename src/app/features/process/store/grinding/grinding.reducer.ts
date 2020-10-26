import * as fromGrindingActions from "./grinding.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";
import { GrindingPageInterface } from "src/app/shared/models/grinding-page.interface";
import { createReducer, on } from "@ngrx/store";

const STATE_INITIAL_GRINDING: GrindingPageInterface = {
  grindings: [],
  result: false,
  isSelected: false,
  loading: false,
  error: null,
  formulations:[],
  processMetadata:null
};

export const grindingReducer = createReducer(
  STATE_INITIAL_GRINDING,
  on(fromGrindingActions.grindingLoadData, (state, { grindings }) => ({
    ...state,
    grindings,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_GRINDING
  ),
  on(fromGrindingActions.grindingRegisterResult, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromGrindingActions.grindingRegister, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromGrindingActions.grindingRegisterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromGrindingActions.grindingRegisterFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromGrindingActions.grindingIsSelected, (state, { isSelected }) => ({
    ...state,
    isSelected,
  })),
  on(fromRecentRecordsActions.recentRecordsCreateNewProcess, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromGrindingActions.setFormulationsByProductRovianda,(state,{formulations})=>({...state,formulations})),
  on(fromGrindingActions.setGrindingProcessMetadata,(state,{process})=>({...state,processMetadata:process}))
);
