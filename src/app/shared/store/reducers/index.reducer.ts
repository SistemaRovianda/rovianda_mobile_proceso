import { AppState } from "../../models/store.state.interface";
import { MetaReducer, ActionReducerMap } from "@ngrx/store";
import { auth } from "firebase";
import { authenticationReducer } from "src/app/features/landing/store/authentication/authentication.reducer";
import { loginReducer } from "src/app/features/landing/store/login/login.reducer";

export const reducers: ActionReducerMap<AppState> = {
  auth: authenticationReducer,
  login: loginReducer,
};
export const metaReducers: MetaReducer<AppState>[] = [];
