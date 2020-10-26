import { createAction, props } from "@ngrx/store";
import { FormulationDetails } from 'src/app/shared/models/formulations.interface';
import { ReprocessingOfProcess } from 'src/app/shared/models/reprocessing.interface';

import { ReprocessingToProcess } from "src/app/shared/models/reprocessingToProcess.interface";

const REPROCESSING_START_REPROCESSING = "[REPROCESSING] Start Reprocessing";

const REPROCESSIN_FINISH = "[REPROCESSING] Finish";

const REPROCESSING_SUCCESS = "[REPROCESSING] Success Register";

const REPROCESSING_FAILURE = "[REPROCESSING] Register Failure";

const REPROCESSING_START_LOAD_OF_LIST_REPROCESSING =
  "[REPROCESSING] Start Load Reprocessing";

const REPROCESSING_LOAD_LIST_OF_LIST_REPROCESSING =
  "[REPROCESSING] Load List Of List Reprocessing";

export const reprocessingStartLoadOfListReprocessing = createAction(
  REPROCESSING_START_LOAD_OF_LIST_REPROCESSING,
  props<{ section: string }>()
);



export const reprocessigFinish = createAction(REPROCESSIN_FINISH);

export const reprocessingSucces = createAction(REPROCESSING_SUCCESS);

export const reprocessingFailure = createAction(
  REPROCESSING_FAILURE,
  props<{ error: string }>()
);


export const getFormulationDetails = createAction(
  "[REPROCESING] getting formulationDetails",
  props<{formulationId:number}>()
);

export const setFormulationDetails = createAction(
  "[REPROCESING] setting formulationDetails",
  props<{formulationDetails:FormulationDetails}>()
);

export const getReprocesingOfProcess = createAction(
  "[REPROCESING] getting reprocesings records"
);

export const setReprocesingOfProcess = createAction(
  "[REPROCESING] setting reprocesings records",
  props<{reprocesings:ReprocessingOfProcess[]}>()
);

export const registerReprocesings = createAction(
  "[REPROCESING] saving reprocesings records",
  props<{reprocesings:ReprocessingToProcess[]}>()
);