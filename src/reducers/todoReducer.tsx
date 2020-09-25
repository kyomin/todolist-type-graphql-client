import {
  GET_ALL_TODOS,
  GET_TODOS,
  CHANGE_TODO_STATUS,
  CHANGE_PREV_TODO_STATUS,
  CHANGE_GET_TODOS_QUERY_VARIABLES,
  MAKE_TODO,
  UPDATE_TODO_DESCRIPTION,
  UPDATE_TODO_STATUS,
  CHANGE_TODO_ID_Of_CLICKED_UPDATE_BUTTON,
  DELETE_TODO,
} from "../actions/Todo/types";

export default function (state = {}, action: any) {
  switch (action.type) {
    case GET_ALL_TODOS:
      return { ...state, allTodos: action.payload };
      break;

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
      return { ...state, createdTodoInfo: action.payload };
      break;

    case UPDATE_TODO_DESCRIPTION:
      return { ...state, updatedTodoInfo: action.payload };
      break;

    case UPDATE_TODO_STATUS:
      return { ...state, updatedTodoInfo: action.payload };
      break;

    case CHANGE_TODO_ID_Of_CLICKED_UPDATE_BUTTON:
      return { ...state, todoIdOfClickedUpdateBtn: action.payload };
      break;

    case DELETE_TODO:
      return { ...state, deletedTodoInfo: action.payload };
      break;

    default:
      return state;
  }
}
