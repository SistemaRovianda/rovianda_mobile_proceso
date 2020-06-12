import { createAction, props } from "@ngrx/store";
import { Sausage } from "src/app/shared/models/sausage.interface";

const SAUSAGE_SEARCH_INFORMATION = "[SAUSAGE] Search Information";

const SAUSAGE_LOAD_DATA = "[SAUSAGE] Load data";

const SAUSAGE_REGISTER = "[SAUSAGE] Register";

const SAUSAGE_REGISTER_RESULTS = "[SAUSAGE] Conditioning Register";

export const sausageSearchInformation = createAction(
  SAUSAGE_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const sausageLoadData = createAction(
  SAUSAGE_LOAD_DATA,
  props<{ sausage: Sausage }>()
);

export const sausageRegister = createAction(SAUSAGE_REGISTER, props<Sausage>());

export const sausageRegisterResults = createAction(
  SAUSAGE_REGISTER_RESULTS,
  props<{ result: boolean }>()
);
