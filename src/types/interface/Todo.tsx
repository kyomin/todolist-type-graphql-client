import { UserInfo } from "../../types/interface/User";
import { TodoStatus } from "../../types/enum/Todo";

export interface TodoInfo {
  id: number;
  description: string;
  status: TodoStatus;
  createdBy: UserInfo;
}

export interface MakeTodoSubmit {
  description: string;
  status: TodoStatus;
}
