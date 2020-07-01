import { createAction, props } from "@ngrx/store";
import { Tenderized } from "src/app/shared/models/tenderized.interface";

const TENDERIZED_SEARCH_INFORMATION = "[TENDERIZED] Search Information";

const TENDERIZED_LOAD_DATA = "[TENDERIZED] Load data";

const TENDERIZED_REGISTER = "[TENDERIZED] Register";

const TENDERIZED_REGISTER_RESULTS = "[TENDERIZED] Tenderized  Register Result";

const TENDERIZED_REGISTER_SUCCESS = "[TENDERIZED] Register Success";

const TENDERIZED_REGISTER_FAILURE = "[TENDERIZED] Registe Failure";

const TENDERIZED_REGISTER_FINISH = "[TENDERIZED] Register Finish";

const TENDERIZED_IS_SELECTED = "[TENDERIZED] Is Selected";

export const tenderizedSearchInformation = createAction(
  TENDERIZED_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const tenderizedLoadData = createAction(
  TENDERIZED_LOAD_DATA,
  props<{ tenderized: Tenderized }>()
);

export const tenderizedRegister = createAction(
  TENDERIZED_REGISTER,
  props<Tenderized>()
);

export const tenderizedRegisterResults = createAction(
  TENDERIZED_REGISTER_RESULTS,
  props<{ result: boolean }>()
);

export const tenderizedRegisterSuccess = createAction(
  TENDERIZED_REGISTER_SUCCESS
);

export const tenderizedRegisterFailure = createAction(
  TENDERIZED_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const tenderizedRegisterFinish = createAction(
  TENDERIZED_REGISTER_FINISH
);

export const tenderizedIsSelected = createAction(
  TENDERIZED_IS_SELECTED,
  props<{ isSelected: boolean }>()
);
