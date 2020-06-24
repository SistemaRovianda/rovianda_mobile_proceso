import { AppState } from "../../models/store.state.interface";
import { MetaReducer, ActionReducerMap } from "@ngrx/store";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { recentRecordsReducer } from "src/app/features/process/store/recent-records/recent-records.reducer";
import { StepperReducer } from "src/app/features/process/store/stepper/stepper.reducer";
import { basicRegisterReducer } from "src/app/features/process/store/basic-register/basic-register.reducer";
import { sausageReducer } from "src/app/features/process/store/sausage/sausage.reducer";
import { conditioningReducer } from "src/app/features/process/store/conditioning/conditioning.reducer";
import { grindingReducer } from "src/app/features/process/store/grinding/grinding.reducer";
import { tenderizedReducer } from "src/app/features/process/store/tenderized/tenderized.reducer";

export const reducers: ActionReducerMap<AppState> = {
  auth: authenticationReducer,
  login: loginReducer,
  recentRecords: recentRecordsReducer,
  steps: StepperReducer,
  basicRegister: basicRegisterReducer,
  sausage: sausageReducer,
  conditioning: conditioningReducer,
  grinding: grindingReducer,
  tenderized: tenderizedReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [];
