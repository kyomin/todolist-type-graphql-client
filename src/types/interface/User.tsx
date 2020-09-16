import { RoleStatus } from "../enum/User";

export interface LoginSubmit {
  email: string;
  password: string;
}

export interface RegisterSubmit {
  name: string;
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: RoleStatus;
}
