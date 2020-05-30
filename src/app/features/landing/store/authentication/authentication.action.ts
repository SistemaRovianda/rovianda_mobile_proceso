import { createAction, props } from "@ngrx/store";
import { AuthenticationUser } from "src/app/shared/models/store.state.interface";

export const LOAD_USER = "[USER] Load User";

export const LOAD_CURRENT_TOKEN = "[USER] Load Current Token";

export const LOAD_CURRENT_TOKEN_SUCCESS = "[USER] Load Current Token Success";

export const CLEAR_USER = "[USER] Clear User";

export const loadUser = createAction(LOAD_USER, props<AuthenticationUser>());

export const loadCurrentToken = createAction(
  LOAD_CURRENT_TOKEN,
  props<{ uid: string }>()
);

export const loadCurrentTokenSuccess = createAction(
  LOAD_CURRENT_TOKEN_SUCCESS,
  props<{ currentToken: string }>()
);

export const clearUser = createAction(CLEAR_USER);
