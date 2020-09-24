import {
  GET_TODOS,
  CHANGE_TODO_STATUS,
  CHANGE_PREV_TODO_STATUS,
  CHANGE_TODO_ID_Of_CLICKED_UPDATE_BUTTON,
  CHANGE_GET_TODOS_QUERY_VARIABLES,
  MAKE_TODO,
  UPDATE_TODO_DESCRIPTION,
  DELETE_TODO,
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

export function changeTodoIdOfClickedUpdateBtn(id: number | undefined) {
  return {
    type: CHANGE_TODO_ID_Of_CLICKED_UPDATE_BUTTON,
    payload: id,
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

export async function updateTodoDescriptionAction(
  id: number,
  newDescription: string,
  updateTodoDescription: any
) {
  try {
    const response = await updateTodoDescription({
      variables: {
        id,
        newDescription,
      },
    });

    const todoInfo: TodoInfo = response.data.updateTodoDescription;

    return {
      type: UPDATE_TODO_DESCRIPTION,
      payload: todoInfo,
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteTodoAction(id: number, deleteTodo: any) {
  try {
    const response = await deleteTodo({
      variables: {
        id,
      },
    });

    const todoInfo: TodoInfo = response.data.deleteTodo;

    return {
      type: DELETE_TODO,
      payload: todoInfo,
    };
  } catch (err) {
    throw err;
  }
}
