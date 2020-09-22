import React, { useEffect } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../reducers";
import { TodoStatus } from "../../../../types/enum/Todo";
import { GET_TODOS } from "../../../../queries/Todo";
import {
  getTodos,
  changeGetTodoQueryVariables,
  changeTodoStatus,
  changePrevTodoStatus,
} from "../../../../actions/Todo/todoAction";

function TodoTab() {
  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todoStatus: TodoStatus | undefined = todoState.todoStatus;
  const prevTodoStatus: TodoStatus | undefined = todoState.prevTodoStatus;

  useEffect(() => {
    dispatch(changeTodoStatus(undefined));
    dispatch(changePrevTodoStatus(undefined));
  }, []);

  const onTodoStateHandler = async (e: any) => {
    const status = e.currentTarget.getAttribute("data-status");

    // 같은 탭을 눌렀어도 이전 탭 상태를 현재로 교체
    if (status === todoStatus) {
      await dispatch(changePrevTodoStatus(status));
    } else {
      // 다른 탭을 누른 경우
      await dispatch(changeTodoStatus(status));
      await dispatch(changeGetTodoQueryVariables({ status }));
    }
  };

  return (
    <Menu
      className="todo_tab_wrap"
      defaultSelectedKeys={["all"]}
      mode="horizontal"
    >
      <Menu.Item key="all">
        <a data-status={undefined} onClick={onTodoStateHandler}>
          전체 보기
        </a>
      </Menu.Item>
      <Menu.Item key="todo">
        <a data-status={TodoStatus.TODO} onClick={onTodoStateHandler}>
          할 일
        </a>
      </Menu.Item>
      <Menu.Item key="done">
        <a data-status={TodoStatus.DONE} onClick={onTodoStateHandler}>
          완료된 일
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(TodoTab);
