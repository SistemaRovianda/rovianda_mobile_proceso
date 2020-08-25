import { RecentRecords } from "./recent-records.interface";
import { Stepper } from "./stepper.interface";
import { SausageInterface } from "./sausage-page.interface";
import { BasicRegister } from "./basic-register.interface";
import { ConditioningInterface } from "./conditioning-page.interface";
import { GrindingPageInterface } from "./grinding-page.interface";
import { TenderizedInterface } from "./tenderized-page.interface";
import { ProcessDetail } from "./process-detail-page.interface";
import { UserPageInterface } from "./user-page.interfac";
import { ProcessReprocessing } from "./process-reprocessing.interface";
import { Process } from './process.interface';
import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';

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
  firstSurname?: string;
  lastSurname?: string;
  job?: string;
}

export interface AppState {
  auth: AuthenticationUser;
  login: LoginState;
  recentRecords: RecentRecords;
  sausage: SausageInterface;
  basicRegister: BasicRegister;
  conditioning: ConditioningInterface;
  grinding: GrindingPageInterface;
  tenderized: TenderizedInterface;
  processDetail: ProcessDetail;
  user: UserPageInterface;
  reprocessing: ProcessReprocessing;
  processMetadata: ProcessMetadata;
}

export interface SignIn {
  email: string;
  password: string;
}
