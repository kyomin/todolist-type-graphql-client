import { LOGIN_USER } from "./types";
import { LoginSubmit } from "../../interface/User";

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
    alert(err.graphQLErrors[0].message);
  }
}
