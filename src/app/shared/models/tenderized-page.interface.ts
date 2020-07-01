import { Tenderized } from "./tenderized.interface";

export interface TenderizedInterface {
  tenderized: Tenderized;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
}
