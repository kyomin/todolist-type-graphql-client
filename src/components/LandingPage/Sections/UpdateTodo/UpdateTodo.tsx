import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { RootState } from "../../../../reducers";
import { UPDATE_TODO_DESCRIPTION } from "../../../../mutations/Todo";
import {
  changeTodoIdOfClickedUpdateBtn,
  updateTodoDescriptionAction,
} from "../../../../actions/Todo/todoAction";

import "./UpdateTodo.scss";
import { TodoInfo } from "../../../../types/interface/Todo";

function UpdateTodo(props: any) {
  const [todoDescription, setTodoDescription] = useState(props.description);

  const [updateTodoDescription] = useMutation(UPDATE_TODO_DESCRIPTION); //  make mutation function
  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todoIdOfClickedUpdateBtn: string = todoState.todoIdOfClickedUpdateBtn;

  const handleChange = (e: any) => {
    setTodoDescription(e.currentTarget.value);
  };

  const handleCancel = () => {
    dispatch(changeTodoIdOfClickedUpdateBtn(undefined));
  };

  const handleUpdate = async (e: any) => {
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

      /* 1. 먼저 할 일 수정을 마치고 */
      const response = await dispatch(
        updateTodoDescriptionAction(
          parseFloat(todoIdOfClickedUpdateBtn),
          todoDescription,
          updateTodoDescription
        )
      );

      /* 2. 업데이트가 반영된 리스트를 만들어 DrawTodoList 컴포넌트로 전달한다. */
      const id: number = response.payload.id;
      const description: string = response.payload.description;
      const updatedTodoList: TodoInfo[] = [];

      for (let i = 0; i < props.todoList.length; i++) {
        let todo: TodoInfo;
        const existingTodo: TodoInfo = props.todoList[i];
        if (existingTodo.id === id) {
          todo = {
            id: existingTodo.id,
            description: description,
            status: existingTodo.status,
            createdBy: existingTodo.createdBy,
          };
        } else {
          todo = {
            id: existingTodo.id,
            description: existingTodo.description,
            status: existingTodo.status,
            createdBy: existingTodo.createdBy,
          };
        }

        updatedTodoList.push(todo);
      }

      props.refreshUpdatedDescription(updatedTodoList);

      /* 2. 수정 버튼이 눌리지 않은 상태로 초기화 */
      await dispatch(changeTodoIdOfClickedUpdateBtn(undefined));
    } catch (err) {
      console.error(err);
      if (err.graphQLErrors) alert(err.graphQLErrors[0].message);
      else alert("할 일 수정에 실패했습니다.");
    }
  };

  return (
    <div className="update_todo_wrap">
      <form className="update_form" onSubmit={handleUpdate}>
        <textarea
          className="description"
          onChange={handleChange}
          value={todoDescription}
        />
        <br />
        <Button className="update_btn" onClick={handleUpdate}>
          수정
        </Button>
        <Button className="cancel_btn" onClick={() => handleCancel()}>
          취소
        </Button>
      </form>
    </div>
  );
}

export default withRouter(UpdateTodo);
