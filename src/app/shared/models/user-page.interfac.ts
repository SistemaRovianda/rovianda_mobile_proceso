import { UserInterface } from "./user.interface";

export interface UserPageInterface {
  user: UserInterface;
  result: boolean;
  isSelected: boolean;
  loading: boolean;
  error: string;
  users: UserInterface[];
}
