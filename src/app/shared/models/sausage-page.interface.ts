import { Sausage } from "./sausage.interface";

export interface SausageInterface {
  sausage: Sausage;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
}
