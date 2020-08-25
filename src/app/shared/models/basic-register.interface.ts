import { LotMeatOutput } from "./Lot-meat-output.interface";
import { ProductsRovianda } from "./produts-rovianda.interface";
import { Process } from "./process.interface";

export interface BasicRegister {
  status: string;
  lots: LotMeatOutput[];
  result: boolean;
  loading: boolean;
  error: string;
  currentProcess: Process;
  isSelected: boolean;
}
