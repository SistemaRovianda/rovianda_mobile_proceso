import { LotMeatOutput } from "./Lot-meat-output.interface";
import { RawMaterial } from "./rawMaterial.interface";

export interface BasicRegister {
  status: string;
  lots: LotMeatOutput[];
  materials: RawMaterial[];
  result: boolean;
  loading: boolean;
  error: string;
}
