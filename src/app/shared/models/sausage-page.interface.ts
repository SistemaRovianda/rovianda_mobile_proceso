import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';
import { FormulationPending } from './formulations.interface';
import { Sausage } from "./sausage.interface";

export interface SausageInterface {
  sausages: SausageOfProcess[];
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
  formulations:FormulationPending[],
  processMetadata:ProcessMetadata
}

export interface SausageOfProcess{
  date:string,
  lotId:string,
  productRovianda:string,
  sausagedId:string,
  temperature:string,
  time:{
    hour1:string,
    hour2:string,
    hour3:string,
    weightFinal:string,
    weightInitial:string,
    weightMedium:string
  },
  formulation:{
    id:number,
    lotDay:string
  }
}

export interface SausageHourRequest{
  hour:number;
  hourSaved:string;
  weigthSaved:string;
}