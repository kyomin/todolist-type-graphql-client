import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { RootState } from "../../../../reducers";
import { getTodos } from "../../../../actions/Todo/todoAction";
import { TodoStatus } from "../../../../types/enum/Todo";
import { GET_TODOS } from "../../../../queries/Todo";

function TodoTab() {
  const [variables, setVariables] = useState({});
  const dispatch = useDispatch();

  const { data, refetch } = useQuery(GET_TODOS, {
    variables,
  });

  useEffect(() => {
    if (data) dispatch(getTodos(data.todos));
    refetch(variables);
  }, [data, variables]);

  const onTodoStateHandler = (e: any) => {
    setVariables({ status: e.currentTarget.getAttribute("data-status") });
  };

  return (
    <Menu className="todo_tab_wrap" mode="horizontal">
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
