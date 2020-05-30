import { AuthenticationUser } from "src/app/shared/models/store.state.interface";
import { createReducer, on } from "@ngrx/store";
import {
  loadUser,
  loadCurrentTokenSuccess,
  clearUser,
} from "./authentication.action";

const AUTHENTICATION_USER_INIT: AuthenticationUser = {
  token: null,
  currentToken: null,
  email: null,
  name: null,
  role: null,
};

export const authenticationReducer = createReducer<AuthenticationUser>(
  AUTHENTICATION_USER_INIT,
  on(loadUser, (state, userCredentials) => ({
    ...state,
    ...userCredentials,
  })),
  on(loadCurrentTokenSuccess, (state, { currentToken }) => ({
    ...state,
    currentToken,
  })),
  on(clearUser, (state) => ({
    ...state,
    ...AUTHENTICATION_USER_INIT,
  }))
);