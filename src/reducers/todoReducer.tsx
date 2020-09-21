import {
  GET_TODOS,
  CHANGE_TODO_STATUS,
  MAKE_TODO,
} from "../actions/Todo/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload };
      break;

    case MAKE_TODO:
      return { ...state, todoInfo: action.payload };
      break;

    default:
      return state;
  }
}
