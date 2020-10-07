
import { FormulationPending } from './formulations.interface';
import { Process } from "./process.interface";

export interface BasicRegister {
  status: string;
  formulations: FormulationPending[];
  result: boolean;
  loading: boolean;
  error: string;
  currentProcess: Process;
  isSelected: boolean;
}
