import { createAction, props } from "@ngrx/store";
import { FormulationPending } from 'src/app/shared/models/formulations.interface';
import { Grinding, GrindingItemToList, GrindingOfProcess } from "src/app/shared/models/grinding.interface";
import { ProcessMetadata } from '../process-detail/process-detail.reducer';

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
  props<{ grindings: GrindingOfProcess[] }>()
);

export const grindingRegister = createAction(
  GRINDING_REGISTER,
  props<{formulationId:number,grindings:GrindingItemToList[]}>()
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

export const getFormulationsByProductRovianda = createAction(
  "[GRINDING] get formulatinos of productRovianda",
  props<{productRoviandaId:number}>()
  );

  export const setFormulationsByProductRovianda = createAction(
    "[GRINDING] set formulations of productRovianda",
    props<{formulations:Array<FormulationPending>}>()
  );

  export const getGrindingProcessMetadata = createAction("[GRINDING], getting process metadata");
export const setGrindingProcessMetadata = createAction("[GRINDING], setting process metadata",props<{process:ProcessMetadata}>());