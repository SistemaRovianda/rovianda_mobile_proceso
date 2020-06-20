import { RecentRecords } from "./recent-records.interface";
import { Stepper } from "./stepper.interface";
<<<<<<< HEAD
import { SausageInterface } from "./sausage-page.interface";
=======
import { BasicRegister } from "./basic-register.interface";
>>>>>>> origin/feature/basic-registration

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
<<<<<<< HEAD
  sausage: SausageInterface;
=======
  basicRegister: BasicRegister;
>>>>>>> origin/feature/basic-registration
}

export interface SignIn {
  email: string;
  password: string;
}
