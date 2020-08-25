import { createAction, props } from "@ngrx/store";
import { Reprocessing } from "src/app/shared/models/reprocessing.interface";
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

export const reprocessingLoadListOfListReprocessing = createAction(
  REPROCESSING_LOAD_LIST_OF_LIST_REPROCESSING,
  props<{ listReprocessing: Reprocessing[] }>()
);

export const reprocessingStartReprocessing = createAction(
  REPROCESSING_START_REPROCESSING,
  props<ReprocessingToProcess>()
);

export const reprocessigFinish = createAction(REPROCESSIN_FINISH);

export const reprocessingSucces = createAction(REPROCESSING_SUCCESS);

export const reprocessingFailure = createAction(
  REPROCESSING_FAILURE,
  props<{ error: string }>()
);
