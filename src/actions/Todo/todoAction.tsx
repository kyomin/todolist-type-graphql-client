import { CHANGE_FLAG, CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON } from "./types";
import { TodoStatus } from "../../types/enum/Todo";

export function changeFlag(flag: TodoStatus) {
  return {
    type: CHANGE_FLAG,
    payload: flag,
  };
}

export function changeIndexOfClickedUpdateBtn(idx: number) {
  return {
    type: CHANGE_INDEX_Of_CLICKED_UPDATE_BUTTON,
    payload: idx,
  };
}
