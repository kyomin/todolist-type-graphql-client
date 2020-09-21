import {
  GET_TODOS,
  CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON,
  MAKE_TODO,
} from "./types";
import { TodoInfo, MakeTodoSubmit } from "../../types/interface/Todo";

export function getTodos(todos: TodoInfo[]) {
  return {
    type: GET_TODOS,
    payload: todos,
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
