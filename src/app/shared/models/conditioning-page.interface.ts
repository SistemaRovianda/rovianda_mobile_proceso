import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';
import { Conditioning, ConditioningOfProcess } from "./conditioning.interface";
import { FormulationPending } from './formulations.interface';


export interface ConditioningInterface {
  error: string;
  conditionings: Array<ConditioningOfProcess>;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  formulations:Array<FormulationPending>
  processMetadata:ProcessMetadata
}


export interface ConditioningItem{
  rawMaterial:string,
  bone:boolean,
  clean:boolean,
  healthing:boolean,
  weight:number,
  temperature:string,
  date:string,
  defrostId:number,
  lotId:string
}