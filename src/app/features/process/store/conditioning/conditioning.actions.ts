import { createAction, props } from "@ngrx/store";
import { Conditioning } from "src/app/shared/models/conditioning.interface";

const CONDITIONING_SEARCH_INFORMATION = "[CONDITIONING] Search Information";

const CONDITIONING_LOAD_DATA = "[CONDITIONING] Load data";

const CONDITIONING_REGISTER = "[CONDITIONING] Register";

const CONDITIONING_REGISTER_RESULTS = "[CONDITIONING] Conditioning Register";

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
