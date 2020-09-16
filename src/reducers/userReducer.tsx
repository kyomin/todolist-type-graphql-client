import { AUTH_USER } from "../actions/User/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    default:
      return state;
  }
}
