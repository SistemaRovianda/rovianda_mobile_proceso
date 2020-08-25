import { LoginState } from "src/app/shared/models/store.state.interface";
import { createReducer, on } from "@ngrx/store";
import * as fromLoginActions from "./login.action";
import { clearUser } from '../authentication/authentication.action';

const LOGIN_STATE_INITIAL: LoginState = { error: null, loading: false };

export const loginReducer = createReducer<LoginState>(
  LOGIN_STATE_INITIAL,
  on(fromLoginActions.signIn, (state) => ({ ...state, loading: true })),
  on(fromLoginActions.finishLoad, (state) => ({ ...state, loading: false })),
  on(fromLoginActions.signInFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(clearUser,(state)=>(LOGIN_STATE_INITIAL))
);
