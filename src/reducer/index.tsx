/* 루트 리듀서를 정의한다. 여러 리듀서를 컴바인 해준다. */
import { combineReducers } from "redux";
import User from "./userReducer";

const rootReducer = combineReducers({
  User,
});

export default rootReducer;
