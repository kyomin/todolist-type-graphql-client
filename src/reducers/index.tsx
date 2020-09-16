/* 루트 리듀서를 정의한다. 여러 리듀서를 컴바인 해준다. */
import { combineReducers } from "redux";
import User from "./userReducer";
import Todo from "./todoReducer";

const rootReducer = combineReducers({
  User,
  Todo,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
