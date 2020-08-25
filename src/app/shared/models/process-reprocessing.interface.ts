import { Reprocessing } from "./reprocessing.interface";

export interface ProcessReprocessing {
  listReprocessing: Reprocessing[];
  loading: boolean;
  error: string;
}
