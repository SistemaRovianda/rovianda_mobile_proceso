import { Conditioning } from "./conditioning.interface";
import { FormulationPending } from './formulations.interface';

export interface ConditioningInterface {
  error: string;
  conditioning: Conditioning;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  formulations:Array<FormulationPending>
}


export interface ConditioningItem{
  bone:boolean,
  clean:boolean,
  healthing:boolean,
  weight:number,
  temperature:string,
  date:string,
  defrostId:number,
  lotId:string
}