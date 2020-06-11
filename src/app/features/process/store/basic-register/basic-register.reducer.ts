import { BasicRegister } from "src/app/shared/models/basic-register.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromBasicRegisterActions from "./basic-register.actions";

const STATE_STATE_BASIC_REGISTER: BasicRegister = {
  status: null,
  lots: [],
  result: false,
};

export const basicRegisterReducer = createReducer(
  STATE_STATE_BASIC_REGISTER,
  on(fromBasicRegisterActions.basicRegisterLoadStatus, (state, { status }) => ({
    ...state,
    status,
  })),
  on(
    fromBasicRegisterActions.basicRegisterLoadLotsOutputMeat,
    (state, { lots }) => ({ ...state, lots })
  )
);
