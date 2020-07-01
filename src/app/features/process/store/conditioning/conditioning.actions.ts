import { createAction, props } from "@ngrx/store";
import { Conditioning } from "src/app/shared/models/conditioning.interface";

const CONDITIONING_SEARCH_INFORMATION = "[CONDITIONING] Search Information";

const CONDITIONING_LOAD_DATA = "[CONDITIONING] Load data";

const CONDITIONING_REGISTER = "[CONDITIONING] Register";

const CONDITIONING_REGISTER_RESULTS = "[CONDITIONING] Conditioning Register";

const CONDITIONING_REGISTER_SUCCESS = "[CONDITIONING] Register Success";

const CONDITIONING_REGISTER_FAILURE = "[CONDITIONING] Register Failure";

const CONDITIONING_REGISTER_FINISH = "[CONDITIONING] Register Finish";

const CONDITIONING_IS_SELECTED = "[CONDITIONING] Is Selected";

export const conditioningSearchInformation = createAction(
  CONDITIONING_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const conditioningLoadData = createAction(
  CONDITIONING_LOAD_DATA,
  props<{ conditioning: Conditioning }>()
);

export const conditioningRegister = createAction(
  CONDITIONING_REGISTER,
  props<Conditioning>()
);

export const conditioningRegisterResults = createAction(
  CONDITIONING_REGISTER_RESULTS,
  props<{ result: boolean }>()
);

export const conditioningRegisterFailure = createAction(
  CONDITIONING_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const conditioningRegisterSuccess = createAction(
  CONDITIONING_REGISTER_SUCCESS
);

export const conditioningRegisterFinish = createAction(
  CONDITIONING_REGISTER_FINISH
);

export const conditioningIsSelected = createAction(
  CONDITIONING_IS_SELECTED,
  props<{ isSelected: boolean }>()
);
