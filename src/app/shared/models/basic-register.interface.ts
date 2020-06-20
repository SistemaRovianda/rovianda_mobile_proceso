import { LotMeatOutput } from "./Lot-meat-output.interface";

export interface BasicRegister {
  status: string;
  lots: LotMeatOutput[];
  result: boolean;
}
