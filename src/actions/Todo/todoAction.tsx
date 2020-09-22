import {
  GET_TODOS,
  CHANGE_TODO_STATUS,
  CHANGE_PREV_TODO_STATUS,
  CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON,
  CHANGE_GET_TODOS_QUERY_VARIABLES,
  MAKE_TODO,
} from "./types";
import {
  TodoInfo,
  TodoQueryVariables,
  MakeTodoSubmit,
} from "../../types/interface/Todo";
import { TodoStatus } from "../../types/enum/Todo";

export function getTodos(todos: TodoInfo[]) {
  return {
    type: GET_TODOS,
    payload: todos,
  };
}

export function changeGetTodoQueryVariables(
  todoQueryVariables: TodoQueryVariables
) {
  return {
    type: CHANGE_GET_TODOS_QUERY_VARIABLES,
    payload: todoQueryVariables,
  };
}

export function changeTodoStatus(todoStatus: TodoStatus | undefined) {
  return {
    type: CHANGE_TODO_STATUS,
    payload: todoStatus,
  };
}

export function changePrevTodoStatus(todoStatus: TodoStatus | undefined) {
  return {
    type: CHANGE_PREV_TODO_STATUS,
    payload: todoStatus,
  };
}

export function changeIndexOfClickedUpdateBtn(idx: number) {
  return {
    type: CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON,
    payload: idx,
  };
}

export async function makeTodoAction(
  dataToSubmit: MakeTodoSubmit,
  makeTodo: any
) {
  try {
    const response = await makeTodo({
      variables: {
        makeTodoInput: dataToSubmit,
      },
    });

    const todoInfo: TodoInfo = response.data.makeTodo;

    return {
      type: MAKE_TODO,
      payload: todoInfo,
    };
  } catch (err) {
    throw err;
  }
}
