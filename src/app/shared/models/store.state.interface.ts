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
}

export interface AppState {
  auth: AuthenticationUser;
  login: LoginState;
}

export interface SignIn {
  email: string;
  password: string;
}
