import { LOGIN_USER, REGISTER_USER } from "../actions/User/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginOutput: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, registerOutput: action.payload };
      break;

    default:
      return state;
  }
}
