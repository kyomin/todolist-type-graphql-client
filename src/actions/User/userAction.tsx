import {
  GET_ALL_USERS,
  LOGIN_USER,
  AUTH_USER,
  REGISTER_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./types";
import {
  LoginSubmit,
  RegisterSubmit,
  UserInfo,
} from "../../types/interface/User";

export async function getAllUsers(users: UserInfo[]) {
  return {
    type: GET_ALL_USERS,
    payload: users,
  };
}

export async function loginUser(dataToSubmit: LoginSubmit, login: any) {
  try {
    const response = await login({
      variables: {
        loginInput: dataToSubmit,
      },
    });

    const userInfo = response.data.login;
    localStorage.setItem("token", userInfo.accessToken);

    return {
      type: LOGIN_USER,
      payload: userInfo,
    };
  } catch (err) {
    throw err;
  }
}

export async function authUser(userData: UserInfo) {
  return {
    type: AUTH_USER,
    payload: userData,
  };
}

export async function registerUser(
  dataToSubmit: RegisterSubmit,
  register: any
) {
  try {
    const response = await register({
      variables: {
        registerInput: dataToSubmit,
      },
    });

    const userInfo: UserInfo = response.data.register;

    return {
      type: REGISTER_USER,
      payload: userInfo,
    };
  } catch (err) {
    throw err;
  }
}

export async function updateUser(dataToSubmit: string, update: any) {
  try {
    const response = await update({
      variables: {
        newPassword: dataToSubmit,
      },
    });

    const userInfo = response.data.update;

    return {
      type: UPDATE_USER,
      payload: userInfo,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteUserAction(id: number, deleteUser: any) {
  try {
    const response = await deleteUser({
      variables: {
        id,
      },
    });

    const userInfo: UserInfo = response.data.deleteUser;

    return {
      type: DELETE_USER,
      payload: userInfo,
    };
  } catch (err) {
    throw err;
  }
}
