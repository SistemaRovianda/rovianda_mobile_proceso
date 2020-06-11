import { RecentRecords } from "./recent-records.interface";
import { Stepper } from "./stepper.interface";
import { BasicRegister } from "./basic-register.interface";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  email?: string;
  role?: string;
  token?: string;
  currentToken?: string;
  rol?: string;
}

export interface AppState {
  auth: AuthenticationUser;
  login: LoginState;
  recentRecords: RecentRecords;
  steps: Stepper;
  basicRegister: BasicRegister;
}

export interface SignIn {
  email: string;
  password: string;
}
