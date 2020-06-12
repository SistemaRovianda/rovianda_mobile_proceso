import { AppState } from "../../models/store.state.interface";
import { MetaReducer, ActionReducerMap } from "@ngrx/store";
import { auth } from "firebase";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { recentRecordsReducer } from "src/app/features/process/store/recent-records/recent-records.reducer";
import { StepperReducer } from "src/app/features/process/store/stepper/stepper.reducer";
import { grindingReducer } from "src/app/features/process/store/grinding/grinding.reducer";

export const reducers: ActionReducerMap<AppState> = {
  auth: authenticationReducer,
  login: loginReducer,
  recentRecords: recentRecordsReducer,
  steps: StepperReducer,
  grinding: grindingReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [];
