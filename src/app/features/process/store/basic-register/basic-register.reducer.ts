import { BasicRegister } from "src/app/shared/models/basic-register.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromBasicRegisterActions from "./basic-register.actions";
import * as fromRecentRecordsActions from "../recent-records/recent-records.actions";

const STATE_STATE_BASIC_REGISTER: BasicRegister = {
  status: null,
  lots: [],
  materials: [],
  result: false,
  error: null,
  loading: false,
};

export const basicRegisterReducer = createReducer(
  STATE_STATE_BASIC_REGISTER,
  on(
    fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat,
    (state, { lots }) => ({ ...state, lots })
  ),
  on(
    fromBasicRegisterActions.basicRegisterLoadMaterials,
    (state, { materials }) => ({ ...state, materials })
  ),
  on(
    fromBasicRegisterActions.basicRegisterStartRegisterNewProcess,
    (state) => ({ ...state, loading: true })
  ),
  on(
    fromBasicRegisterActions.basicRegisterFinishNewRegisterProcess,
    (state) => ({ ...state, loading: false })
  ),
  on(
    fromBasicRegisterActions.basicRegisterNewProcessFailure,
    (state, { error }) => ({ ...state, error })
  ),
  on(fromRecentRecordsActions.recentRecordsLoadSelectProcess, (state) => ({
    ...state,
    result: true,
  })),
  on(
    fromRecentRecordsActions.recentRecordsLoadRecords,
    (state) => STATE_STATE_BASIC_REGISTER
  ),
  on(
    fromBasicRegisterActions.basicRegisterRegisterDefrostProcess,
    (state) => ({
      ...state,
      loading: true,
    })
  )
);
