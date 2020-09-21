import React, { useEffect } from "react";
import { Menu } from "antd";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeTodoStatus } from "../../../../actions/Todo/todoAction";
import { TodoStatus } from "../../../../types/enum/Todo";

function TodoTab() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 디폴트 탭 상태는 TODO이다.
    dispatch(changeTodoStatus(TodoStatus.TODO));
  }, []);

  const onTodoStateHandler = (e: any) => {
    dispatch(changeTodoStatus(e.currentTarget.getAttribute("data-status")));
  };

  return (
    <Menu className="todo_tab_wrap" mode="horizontal">
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
