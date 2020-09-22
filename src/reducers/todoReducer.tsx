import {
  GET_TODOS,
  CHANGE_TODO_STATUS,
  CHANGE_PREV_TODO_STATUS,
  CHANGE_GET_TODOS_QUERY_VARIABLES,
  MAKE_TODO,
} from "../actions/Todo/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.payload };
      break;

    case CHANGE_GET_TODOS_QUERY_VARIABLES:
      return { ...state, getTodosQueryVariables: action.payload };
      break;

    case CHANGE_TODO_STATUS:
      return { ...state, todoStatus: action.payload };
      break;

    case CHANGE_PREV_TODO_STATUS:
      return { ...state, prevTodoStatus: action.payload };
      break;

    case MAKE_TODO:
      return { ...state, todoInfo: action.payload };
      break;

    default:
      return state;
  }
}
