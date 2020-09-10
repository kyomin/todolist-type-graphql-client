import { LOGIN_USER, REGISTER_USER, UPDATE_USER } from "./types";
import { LoginSubmit, RegisterSubmit } from "../../interface/User";

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

    const userInfo = response.data.register;

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
