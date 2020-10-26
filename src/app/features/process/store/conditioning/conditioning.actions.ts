import { createAction, props } from "@ngrx/store";
import { ConditioningItem } from 'src/app/shared/models/conditioning-page.interface';
import {  ConditioningOfProcess } from "src/app/shared/models/conditioning.interface";
import { FormulationPending } from 'src/app/shared/models/formulations.interface';
import { ProcessMetadata } from '../process-detail/process-detail.reducer';

const CONDITIONING_SEARCH_INFORMATION = "[CONDITIONING] Search Information";

const CONDITIONING_LOAD_DATA = "[CONDITIONING] Load data";

const CONDITIONING_REGISTER = "[CONDITIONING] Register";

const CONDITIONING_REGISTER_RESULTS = "[CONDITIONING] Conditioning Register";

const CONDITIONING_REGISTER_SUCCESS = "[CONDITIONING] Register Success";

const CONDITIONING_REGISTER_FAILURE = "[CONDITIONING] Register Failure";

const CONDITIONING_REGISTER_FINISH = "[CONDITIONING] Register Finish";

const CONDITIONING_IS_SELECTED = "[CONDITIONING] Is Selected";
const CONDITIONING_GETTIN_FORMULATIONS = "[CONDITIONING] Getting formulations of productRovianda";
const CONDITIONING_SETTIN_FORMULATIONS = "[CONDITIONING] Setting formulations of productRovianda";
const CONDITIONING_REGISTER_TO_SYSTEM ="[CONDITIONING] Registing Conditioning to system";

export const conditioningSearchInformation = createAction(
  CONDITIONING_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const conditioningLoadData = createAction(
  CONDITIONING_LOAD_DATA,
  props<{ conditionings: Array<ConditioningOfProcess> }>()
);

export const conditioningRegister = createAction(
  CONDITIONING_REGISTER,
  props<ConditioningItem>()
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


export const getFormulationsByProductRovianda = createAction(
  CONDITIONING_GETTIN_FORMULATIONS,
  props<{productRoviandaId:number}>()
)

export const setFormulationsByProductRovianda = createAction(
  CONDITIONING_SETTIN_FORMULATIONS,
  props<{formulations:Array<FormulationPending>}>()
)

export const registerConditioning = createAction(
  CONDITIONING_REGISTER_TO_SYSTEM,
  props<{formulationId:number,conditioning:Array<ConditioningItem>}>()
);

export const getConditioningProcessMetadata = createAction("[CONDITIONING], getting process metadata");
export const setConditioningProcessMetadata = createAction("[CONDITIONING], setting process metadata",props<{process:ProcessMetadata}>());