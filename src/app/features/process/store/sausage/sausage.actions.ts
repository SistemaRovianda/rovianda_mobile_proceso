import { createAction, props } from "@ngrx/store";
import { Sausage, SausageItemToList } from "src/app/shared/models/sausage.interface";
import { SausageHour } from "src/app/shared/models/sausage-hour.interface";
import { FormulationPending } from 'src/app/shared/models/formulations.interface';
import { ProcessMetadata } from '../process-detail/process-detail.reducer';
import { SausageHourRequest, SausageOfProcess } from 'src/app/shared/models/sausage-page.interface';

const SAUSAGE_SEARCH_INFORMATION = "[SAUSAGE] Search Information";

const SAUSAGE_LOAD_DATA = "[SAUSAGE] Load data";

const SAUSAGE_REGISTER = "[SAUSAGE] Register";

const SAUSAGE_REGISTER_RESULTS = "[SAUSAGE] Register Results";

const SAUSAGE_REGISTER_SUCCESS = "[SAUSAGE] Register Success";

const SAUSAGE_REGISTER_FAILURE = "[SAUSAGE] Register Failure";

const SAUSAGE_REGISTER_FINISH = "[SAUSAGE] Register Finish";

const SAUSAGE_REGISTER_IS_SELECTED = "[SAUSAGE] Register Is Selected";

const SAUSAGE_START_REGISTER_DATE_AND_WEIGTH =
  "[SAUSAGE] Start  Register Date And Weight";

const SAUSAGE_SUCCESS_REGISTER_DATE_AND_WEIGTH =
  "[SAUSAGE] Register Date And Weight";

const SAUSAGE_GET_FORMULATIONS_BY_PRODUCT_ROVIANDA = "[SAUSAGE] Getting Formulations Of Product Rovianda"
const SAUSAGE_SET_FORMULATIONS_BY_PRODUCT_ROVIANDA = "[SAUSAGE] Setting Formulations Of Product Rovianda"
export const sausageSearchInformation = createAction(
  SAUSAGE_SEARCH_INFORMATION,
  props<{ processId: number }>()
);

export const sausageLoadData = createAction(
  SAUSAGE_LOAD_DATA,
  props<{ sausages: SausageOfProcess[] }>()
);

export const sausageRegister = createAction(SAUSAGE_REGISTER, props<{sausages:Array<SausageItemToList>,formulationId:number}>());

export const sausageRegisterResults = createAction(
  SAUSAGE_REGISTER_RESULTS,
  props<{ result: boolean }>()
);

export const sausageRegisterSuccess = createAction(SAUSAGE_REGISTER_SUCCESS);

export const sausageRegisterFailure = createAction(
  SAUSAGE_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const sausageFinish = createAction(SAUSAGE_REGISTER_FINISH);

export const sausageIsSelected = createAction(
  SAUSAGE_REGISTER_IS_SELECTED,
  props<{ isSelected: boolean }>()
);

export const sausageStartRegisterDateAndWeigth = createAction(
  SAUSAGE_START_REGISTER_DATE_AND_WEIGTH,
  props<{ hour: SausageHour; sausagedId: number }>()
);

export const sausageSuccessRegisterDateAndWeigth = createAction(
  SAUSAGE_SUCCESS_REGISTER_DATE_AND_WEIGTH
);

export const getFormulationsByProductRovianda = createAction(
  SAUSAGE_GET_FORMULATIONS_BY_PRODUCT_ROVIANDA,
  props<{productRoviandaId:number}>()
);

export const setFormulationsByProductRovianda = createAction(
  SAUSAGE_SET_FORMULATIONS_BY_PRODUCT_ROVIANDA,
  props<{formulations:FormulationPending[]}>()
);


export const getSausageProcessMetadata = createAction("[SAUSAGE], getting process metadata");
export const setSausageProcessMetadata = createAction("[SAUSAGE], setting process metadata",props<{process:ProcessMetadata}>());

export const updateSausageHour=createAction("[SAUSAGE] updating sausage hours",props<{sausageId:number,sausageHours:SausageHourRequest}>());
export const updateErrorSausageHour=createAction("[SAUSAGE] updating sausage hours ERROR",props<{error:string}>());
export const updateSuccessSausageHour=createAction("[SAUSAGE] updating sausage hours SUCCESS");