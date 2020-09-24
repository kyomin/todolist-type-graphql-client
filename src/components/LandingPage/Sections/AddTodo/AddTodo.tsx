import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { MAKE_TODO } from "../../../../mutations/Todo";
import { makeTodoAction } from "../../../../actions/Todo/todoAction";
import { TodoInfo, MakeTodoSubmit } from "../../../../types/interface/Todo";
import { TodoStatus } from "../../../../types/enum/Todo";
import { RootState } from "../../../../reducers";

import "./AddTodo.scss";

function AddTodo(props: any) {
  const [makeTodo] = useMutation(MAKE_TODO); //  make mutation function
  const dispatch = useDispatch();
  const [todoDescription, setTodoDescription] = useState("");
  const userState: any = useSelector((state: RootState) => state.User);
  const todoState: any = useSelector((state: RootState) => state.Todo);

  const userData: any = userState.userData;
  const todos: any = todoState.todos;

  const handleChange = (e: any) => {
    setTodoDescription(e.currentTarget.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      /* Validation Check In Client */
      if (todoDescription === "") {
        alert("내용을 입력해 주십시오!");
        return;
      }

      if (todoDescription.length < 5) {
        alert("할 일 내용은 5글자 이상이어야 합니다");
        return;
      }

      if (todoDescription.length > 100) {
        alert("할 일 내용은 100자 이내여야 합니다");
        return;
      }

      const dataToSubmit: MakeTodoSubmit = {
        description: todoDescription,
        status: TodoStatus.TODO,
      };

      /* 1. 먼저 할 일 등록을 마치고 */
      const response = await dispatch(makeTodoAction(dataToSubmit, makeTodo));

      /* 2. 등록이 반영된 리스트를 만들어 DrawTodoList 컴포넌트로 전달한다. */
      const createdTodoList: TodoInfo[] = [];
      const newTodo: TodoInfo = {
        id: response.payload.id,
        description: response.payload.description,
        status: response.payload.status,
        createdBy: response.payload.createdBy,
      };

      createdTodoList.push(newTodo);
      props.refreshCreatedTodo(createdTodoList.concat(props.todoList));

      setTodoDescription("");
    } catch (err) {
      console.error(err);
      if (err.graphQLErrors[0]) alert(err.graphQLErrors[0].message);
      else alert("할 일 등록에 실패했습니다.");
    }
  };

  // 인증이 되어있고, todo 리스트가 잘 렌더링되어 있다면
  if (userData && todos) {
    return (
      <div className="add_todo_wrap">
        <form className="add_form" onSubmit={handleSubmit}>
          <textarea
            className="description"
            onChange={handleChange}
            value={todoDescription}
            placeholder="할 일을 작성해 주세요"
          />
          <br />
          <button className="add_btn" onClick={handleSubmit}>
            등록
          </button>
        </form>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
}

export default withRouter(AddTodo);