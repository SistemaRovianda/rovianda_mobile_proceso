import { ProcessMetadata } from 'src/app/features/process/store/process-detail/process-detail.reducer';
import { FormulationPending } from './formulations.interface';
import { Grinding, GrindingOfProcess } from "./grinding.interface";

export interface GrindingPageInterface {
  grindings: GrindingOfProcess[];
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
  formulations:FormulationPending[],
  processMetadata:ProcessMetadata
}
