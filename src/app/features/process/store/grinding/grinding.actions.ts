import { createAction, props } from "@ngrx/store";
import { Grinding } from "src/app/shared/models/grinding.interface";

const GRINDING_SEARCH_INFORMATION = "[GRINDING] Search Information";

const GRINDING_LOAD_DATA = "[GRINDING] Load Data";

const GRINDING_REGISTER = "[GRINDING] Register";

const GRINDING_REGISTER_RESULT = "[GRINDING] Register Result";

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
