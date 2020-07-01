import { createAction, props } from "@ngrx/store";
import { UserInterface } from "src/app/shared/models/user.interface";

const USER_SEARCH_INFORMACTION = "[USER] Search Information";

const USER_LOAD_DATA = "[USER] Load Data";

const USER_REGISTER = "[USER] Register";

const USER_REGISTER_RESULT = "[USER] Register Result";

const USER_REGISTER_SUCCESS = "[USER] Register Success";

const USER_REGISTER_FAILURE = "[USER] Register Failure";

const USER_REGISTER_FINISH = "[USER] Register Finish";

const USER_IS_SELECTED = "[USER] Is Selected";

const USER_START_LOAD_USERS = "[USER] Start Load Users";

const USER_LOAD_USERS = "[USER] Load Users";

export const userSearchInformation = createAction(
  USER_SEARCH_INFORMACTION,
  props<{ processId: number }>()
);

export const userLoadData = createAction(
  USER_LOAD_DATA,
  props<{ user: UserInterface }>()
);

export const userRegister = createAction(USER_REGISTER, props<UserInterface>());

export const userRegisterResult = createAction(
  USER_REGISTER_RESULT,
  props<{ result: boolean }>()
);

export const userRegisterSuccess = createAction(USER_REGISTER_SUCCESS);

export const userRegisterFailure = createAction(
  USER_REGISTER_FAILURE,
  props<{ error: string }>()
);

export const userRegisterFinish = createAction(USER_REGISTER_FINISH);

export const userIsSelected = createAction(
  USER_IS_SELECTED,
  props<{ isSelected: boolean }>()
);

export const userStartLoadUsers = createAction(USER_START_LOAD_USERS);

export const userLoadUsers = createAction(
  USER_LOAD_USERS,
  props<{ users: UserInterface[] }>()
);
