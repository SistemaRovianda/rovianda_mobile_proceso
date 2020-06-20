import { AppState } from "../../models/store.state.interface";
import { MetaReducer, ActionReducerMap } from "@ngrx/store";
import { auth } from "firebase";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";
import { recentRecordsReducer } from "src/app/features/process/store/recent-records/recent-records.reducer";
import { StepperReducer } from "src/app/features/process/store/stepper/stepper.reducer";
<<<<<<< HEAD
import { sausageReducer } from "src/app/features/process/store/sausage/sausage.reducer";
=======
import { basicRegisterReducer } from "src/app/features/process/store/basic-register/basic-register.reducer";
>>>>>>> origin/feature/basic-registration

export const reducers: ActionReducerMap<AppState> = {
  auth: authenticationReducer,
  login: loginReducer,
  recentRecords: recentRecordsReducer,
  steps: StepperReducer,
<<<<<<< HEAD
  sausage: sausageReducer,
=======
  basicRegister: basicRegisterReducer,
>>>>>>> origin/feature/basic-registration
};
export const metaReducers: MetaReducer<AppState>[] = [];
