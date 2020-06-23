import { RecentRecords } from "./recent-records.interface";
import { Stepper } from "./stepper.interface";
import { SausageInterface } from "./sausage-page.interface";
import { BasicRegister } from "./basic-register.interface";
import { ConditioningInterface } from "./conditioning-page.interface";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  email?: string;
  token?: string;
  currentToken?: string;
  rol?: string;
}

export interface AppState {
  auth: AuthenticationUser;
  login: LoginState;
  recentRecords: RecentRecords;
  steps: Stepper;
  sausage: SausageInterface;
  basicRegister: BasicRegister;
  conditioning: ConditioningInterface;
}

export interface SignIn {
  email: string;
  password: string;
}
