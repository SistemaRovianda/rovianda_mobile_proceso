import { createAction, props } from "@ngrx/store";
import { Tenderized } from "src/app/shared/models/tenderized.interface";

const TENDERIZED_SEARCH_INFORMATION = "[TENDERIZED] Search Information";

const TENDERIZED_LOAD_DATA = "[TENDERIZED] Load data";

const TENDERIZED_REGISTER = "[TENDERIZED] Register";

const TENDERIZED_REGISTER_RESULTS = "[TENDERIZED] Conditioning Register";

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
