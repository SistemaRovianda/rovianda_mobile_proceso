import { createAction, props } from "@ngrx/store";
import { LotMeatOutput } from "src/app/shared/models/Lot-meat-output.interface";
import { NewProcess } from "src/app/shared/models/new-process.interface";
import { ProductsRovianda } from "src/app/shared/models/produts-rovianda.interface";
import { Defrost } from "src/app/shared/models/defrost.interface";
import { Process } from "src/app/shared/models/process.interface";

const BASIC_REGISTER_SEARCH_INFORMATION = "[BASIC REGISTER] Search Information";

const BASIC_REGISTER_LOAD_DATA = "[BASIC REGISTER] Load Data";

const BASIC_REGISTER_SELECT_MATERIAL = "[BASIC REGISTER] Select Material";

const BASIC_REGISTER_IS_SELECTED = "[BASIC REGISTER] Is Selected";

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

const BASIC_REGISTER_NEW_PROCESS_SUCCESS =
  "[BASIC REGISTER] New Process Success";

const BASIC_REGISTER_START_REGISTER_DEFROST_AFTER_REGISTER_PROCESS =
  "[BASIC REGISTER] Start Register Defrost After Register Process";

export const basicRegisterSearchInformation = createAction(
  BASIC_REGISTER_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const basicRegisterLoadData = createAction(
  BASIC_REGISTER_LOAD_DATA,
  props<{ currentProcess: Process }>()
);

export const basiRegisterIsSelected = createAction(
  BASIC_REGISTER_IS_SELECTED,
  props<{ isSelected: boolean }>()
);

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
  props<{ materials: ProductsRovianda[] }>()
);

export const basicRegisterRegisterDefrostProcess = createAction(
  BASIC_REGISTER_REGISTER_DEFROST_PROCESS,
  props<{ defrost: Defrost; processId: number }>()
);

export const basicRegisterRegisterDefrostProcessSuccess = createAction(
  BASIC_REGISTER_REGISTER_DEFROST_PROCESS_SUCCESS
);

export const basicRegisterNewProcessSuccess = createAction(
  BASIC_REGISTER_NEW_PROCESS_SUCCESS
);

export const basicRegisterStartRegisterDefrostAfterRegisterProcess = createAction(
  BASIC_REGISTER_START_REGISTER_DEFROST_AFTER_REGISTER_PROCESS
);
