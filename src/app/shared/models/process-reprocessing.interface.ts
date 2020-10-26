import { FormulationDetails } from './formulations.interface';
import { ReprocessingOfProcess } from './reprocessing.interface';


export interface ProcessReprocessing {
  listReprocessing: ReprocessingOfProcess[];
  loading: boolean;
  error: string;
  formulationDetails:FormulationDetails;
}

export interface FormulationDefrost{
  lotMeat:string,
  defrostId:number,
  rawMaterial:string
}
