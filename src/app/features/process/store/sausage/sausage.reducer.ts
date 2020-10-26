import { createReducer, on } from "@ngrx/store";
import * as fromRecentRecordsActions from "../../store/recent-records/recent-records.actions";
import * as fromSausageActions from "./sausage.actions";
import { SausageInterface } from "src/app/shared/models/sausage-page.interface";

const STATE_INITIAL_SAUSAGE: SausageInterface = {
  sausages:[],
  result: false,
  error: null,
  isSelected: false,
  loading: false,
  formulations:[],
  processMetadata:null
};

export const sausageReducer = createReducer(
  STATE_INITIAL_SAUSAGE,
  on(fromSausageActions.sausageLoadData, (state, { sausages }) => ({
    ...state,
    sausages,
  })),
  on(fromSausageActions.setFormulationsByProductRovianda,(state,{formulations})=>({...state,formulations}))
  ,
  on(
    fromRecentRecordsActions.recentRecordsLoadRecordsSuccess,
    (state) => STATE_INITIAL_SAUSAGE
  ),
  on(fromSausageActions.sausageRegister, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromSausageActions.sausageRegisterResults, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromSausageActions.sausageRegisterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromSausageActions.sausageFinish, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromSausageActions.sausageIsSelected, (state, { isSelected }) => ({
    ...state,
    isSelected,
  })),
  on(fromSausageActions.sausageStartRegisterDateAndWeigth, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromRecentRecordsActions.recentRecordsCreateNewProcess, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromSausageActions.setSausageProcessMetadata,(state,{process})=>({...state,processMetadata:process})),
  on(fromSausageActions.updateSausageHour,(state)=>({...state,loading:true})),
  on(fromSausageActions.updateSuccessSausageHour,(state)=>({...state,loading:false})),
  on(fromSausageActions.updateErrorSausageHour,(state,{error})=>({...state,loading:false,error}))
);
