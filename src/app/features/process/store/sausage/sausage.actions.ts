import { createAction, props } from "@ngrx/store";
import { Sausage } from "src/app/shared/models/sausage.interface";

const SAUSAGE_SEARCH_INFORMATION = "[SAUSAGE] Search Information";

const SAUSAGE_LOAD_DATA = "[SAUSAGE] Load data";

const SAUSAGE_REGISTER = "[SAUSAGE] Register";

const SAUSAGE_REGISTER_RESULTS = "[SAUSAGE] Register Results";

const SAUSAGE_REGISTER_SUCCESS = "[SAUSAGE] Register Success";

const SAUSAGE_REGISTER_FAILURE = "[SAUSAGE] Register Failure";

const SAUSAGE_REGISTER_FINISH = "[SAUSAGE] Register Finish";

const SAUSAGE_REGISTER_IS_SELECTED = "[SAUSAGE] Register Is Selected";

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

export const sausageRegisterSuccess = createAction(SAUSAGE_REGISTER_SUCCESS);

export const sausageRegisterFailure = createAction(
  SAUSAGE_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const sausageFinish = createAction(SAUSAGE_REGISTER_FINISH);

export const sausageIsSelected = createAction(
  SAUSAGE_REGISTER_IS_SELECTED,
  props<{ isSelected: boolean }>()
);
