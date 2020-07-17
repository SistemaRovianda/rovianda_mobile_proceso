import { createAction, props } from "@ngrx/store";
import { Grinding } from "src/app/shared/models/grinding.interface";

const GRINDING_SEARCH_INFORMATION = "[GRINDING] Search Information";

const GRINDING_LOAD_DATA = "[GRINDING] Load Data";

const GRINDING_REGISTER = "[GRINDING] Register";

const GRINDING_REGISTER_RESULT = "[GRINDING] Register Result";

const GRINDING_REGISTER_SUCCESS = "[GRINDING] Register Success";

const GRINDING_REGISTER_FAILURE = "[GRINDING] Register Failure";

const GRINDING_REGISTER_FINISH = "[GRINDING] Register Finish";

const GRINDING_IS_SELECTED = "[GRINDING] Is Selected";

export const grindingSearchInformation = createAction(
  GRINDING_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const grindingLoadData = createAction(
  GRINDING_LOAD_DATA,
  props<{ grinding: Grinding }>()
);

export const grindingRegister = createAction(
  GRINDING_REGISTER,
  props<Grinding>()
);

export const grindingRegisterResult = createAction(
  GRINDING_REGISTER_RESULT,
  props<{ result: boolean }>()
);

export const grindingRegisterFailure = createAction(
  GRINDING_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const grindingRegisterFinish = createAction(GRINDING_REGISTER_FINISH);

export const grindingRegisterSuccess = createAction(GRINDING_REGISTER_SUCCESS);

export const grindingIsSelected = createAction(
  GRINDING_IS_SELECTED,
  props<{ isSelected: boolean }>()
);
