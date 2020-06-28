import { createAction, props } from "@ngrx/store";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import { RawMaterial } from "src/app/shared/models/rawMaterial.interface";
import { Defrost } from "src/app/shared/models/defrost.interface";

const BASIC_REGISTER_SELECT_MATERIAL = "[BASIC REGISTER] Select Material";

const BASIC_REGISTER_LOAD_LOTS_OUTPUT_MEAT =
  "[BASIC REGISTER] Load Lots Output Meat";

const BASIC_REGISTER_START_REGISTER_NEW_PROCESS =
  "[BASIC REGISTER] Start Register New Process";

const BASIC_REGISTER_LOAD_RESULTS_NEW_REGISTER_PROCESS =
  "[BASIC REGISTER] Load Results New Register Process";

const BASIC_REGISTER_NEW_REGISTER_PROCESS_SUCCESS =
  "[BASIC REGISTER] New Register Process Success";

const BASIC_REGISTER_FINISH_NEW_REGISTER_PROCESS =
  "[BASIC REGISTES] Finish New Register Process";

const BASIC_REGISTER_NEW_REGISTER_PROCESS_FAILURE =
  "[BASIC REGISTER] New Register Process Failure";

const BASIC_REGISTER_START_LOAD_MATERIALS =
  "[BASIC REGISTER] Start Load Materials";

const BASIC_REGISTER_LOAD_MATERIALS = "[BASIC REGISTER] Load Materials";

const BASIC_REGISTER_REGISTER_DEFROST_PROCESS =
  "[BASIC REGISTER] REgister Defrost Process";

const BASIC_REGISTER_REGISTER_DEFROST_PROCESS_SUCCESS =
  "[BASIC REGISTER] REgister Defrost Process Success";
/*


const BASIC_REGISTER_LOAD_RESULTS_NEW_REGISTER_PROCESS = "[BASIC REGISTER] Load Results New Register Process";*/

export const basicRegisterSelectMaterial = createAction(
  BASIC_REGISTER_SELECT_MATERIAL,
  props<{ status: string; rawMaterialId: number }>()
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

export const basicRegisterNewRegisterProcessSucess = createAction(
  BASIC_REGISTER_NEW_REGISTER_PROCESS_SUCCESS
);

export const basicRegisterNewProcessFailure = createAction(
  BASIC_REGISTER_NEW_REGISTER_PROCESS_FAILURE,
  props<{ error: string }>()
);

export const basicRegisterFinishNewRegisterProcess = createAction(
  BASIC_REGISTER_FINISH_NEW_REGISTER_PROCESS
);

export const basicRegisterStartLoadMaterials = createAction(
  BASIC_REGISTER_START_LOAD_MATERIALS
);

export const basicRegisterLoadMaterials = createAction(
  BASIC_REGISTER_LOAD_MATERIALS,
  props<{ materials: RawMaterial[] }>()
);

export const basicRegisterRegisterDefrostProcess = createAction(
  BASIC_REGISTER_REGISTER_DEFROST_PROCESS,
  props<{ defrost: Defrost; processId: number }>()
);

export const basicRegisterRegisterDefrostProcessSuccess = createAction(
  BASIC_REGISTER_REGISTER_DEFROST_PROCESS_SUCCESS
);
