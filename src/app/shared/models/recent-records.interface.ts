import { Process } from "./process.interface";

export interface RecentRecords {
  process: Process[];
  error: string;
  processSelected: Process;
  isSelected: boolean;
  isNewRegister: boolean;
  path: string;
  newRegisterProcessSuccess: boolean;
}
