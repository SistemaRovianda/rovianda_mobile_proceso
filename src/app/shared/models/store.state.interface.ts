import { RecentRecords } from "./recent-records.interface";

export interface LoginState {
  loading: boolean;
  error: string;
}

export interface AuthenticationUser {
  uid?: string;
  name?: string;
  email?: string;
  rol?: string;
  token?: string;
  currentToken?: string;
  rol?: string;
}

export interface AppState {
  auth: AuthenticationUser;
  login: LoginState;
  recentRecords: RecentRecords;
}

export interface SignIn {
  email: string;
  password: string;
}
