import { GET_ALL_USERS, AUTH_USER, DELETE_USER } from "../actions/User/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userData: action.payload };
      break;

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
      break;

    case DELETE_USER:
      return { ...state, deletedUser: action.payload };
      break;

    default:
      return state;
  }
}
