import { createAction, props } from "@ngrx/store";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { NewProcess } from "src/app/shared/models/new-process.interface";

const BASIC_REGISTER_LOAD_STATUS = "[BASIC REGISTER] Load Status";

const BASIC_REGISTER_LOAD_LOTS_OUTPUT_MEAT =
  "[BASIC REGISTER] Load Lots Output Meat";

const BASIC_REGISTER_START_REGISTER_NEW_PROCESS =
  "[BASIC REGISTER] Start Register New Process";

const BASIC_REGISTER_LOAD_RESULTS_NEW_REGISTER_PROCESS =
  "[BASIC REGISTER] Load Results New Register Process";
/*


const BASIC_REGISTER_LOAD_RESULTS_NEW_REGISTER_PROCESS = "[BASIC REGISTER] Load Results New Register Process";*/

export const basicRegisterLoadStatus = createAction(
  BASIC_REGISTER_LOAD_STATUS,
  props<{ status: string }>()
);

export const basicRegisterLoadLotsOutputMeat = createAction(
  BASIC_REGISTER_LOAD_LOTS_OUTPUT_MEAT,
  props<{ lots: LotMeatOutput[] }>()
);

export const basicRegisterStartRegisterNewProcess = createAction(
  BASIC_REGISTER_START_REGISTER_NEW_PROCESS,
  props<{ newProcess: NewProcess }>()
);

export const basicRegisterLoadResultsNewRegisterProcess = createAction(
  BASIC_REGISTER_LOAD_RESULTS_NEW_REGISTER_PROCESS,
  props<{ result: boolean }>()
);
