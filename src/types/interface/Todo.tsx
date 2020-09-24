import { UserInfo } from "../../types/interface/User";
import { TodoStatus } from "../../types/enum/Todo";

export interface TodoInfo {
  id: number;
  description: string;
  status: TodoStatus;
  createdBy: UserInfo;
  createdAt: string;
}

export interface MakeTodoSubmit {
  description: string;
  status: TodoStatus;
}

export interface TodoQueryVariables {
  cursor?: number;
  status?: TodoStatus;
}
