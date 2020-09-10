import { LOGIN_USER } from "../actions/User/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    default:
      return state;
  }
}
