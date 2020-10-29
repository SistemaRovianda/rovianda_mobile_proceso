import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';
import { FormulationPending } from './formulations.interface';
import { Tenderized } from "./tenderized.interface";

export interface TenderizedInterface {
  tenderizeds: TenderizedOfProcess[];
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
  formulations:FormulationPending[],
  processMetadata:ProcessMetadata
}


export interface TenderizedItemToList{
  rawMaterial:string,
  defrostId:number,
  temperature:string,
  weight:number,
  weightSalmuera:number,
  percentage:number,
  date:string,
  lotId:string
}

export interface TenderizedOfProcess{
  tenderizedId:number,
  lotId:string,
  temperature:string,
  weight:number,
  weightSalmuera:number,
  percentage:number,
  date:string,
  rawMaterial:string
}