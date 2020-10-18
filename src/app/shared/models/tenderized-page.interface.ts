import { FormulationPending } from './formulations.interface';
import { Tenderized } from "./tenderized.interface";

export interface TenderizedInterface {
  tenderized: Tenderized;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
  formulations:FormulationPending[]
}


export interface TenderizedItemToList{
  defrostId:number,
  temperature:string,
  weight:number,
  weightSalmuera:number,
  percentage:number,
  date:string,
  lotId:string
}