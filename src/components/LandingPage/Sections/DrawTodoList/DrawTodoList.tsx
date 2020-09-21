import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { RootState } from "../../../../reducers";
import { TodoStatus } from "../../../../types/enum/Todo";
import { TodoInfo } from "../../../../types/interface/Todo";
import { GET_TODOS } from "../../../../queries/Todo";

import {
  getTodos,
  changeIndexOfClickedUpdateBtn,
} from "../../../../actions/Todo/todoAction";

import "./DrawTodoList.scss";
import TodoTab from "../TodoTab/TodoTab";
import AddTodo from "../AddTodo/AddTodo";

function DrawTodoList() {
  const [variables, setVariables] = useState({});
  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todos: TodoInfo[] = todoState.todos;

  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    variables,
  });

  useEffect(() => {
    if (data) dispatch(getTodos(data.todos));
    refetch(variables);
  }, [data, variables]);

  const drawTodoList = () => {
    return todos.map((todo: any, idx: number) => {
      return (
        <div key={idx} className="todo_wrap">
          <div>
            <span className="todo_index">{idx + 1}. </span>
            {todo.description}
          </div>
        </div>
      );
    });
  };

  // 서버 응답 로딩 중...
  if (loading) return <div>loading...</div>;

  // todo 목록 불러오기 실패 !!
  if (error) {
    console.error(error);
    if (error.graphQLErrors[0]) alert(error.graphQLErrors[0].message);

    return <div>error...</div>;
  }

  if (todos) {
    return (
      <div>
        <div className="todo_list_wrap">
          <div className="container">
            <TodoTab />
            {drawTodoList()}
            <AddTodo />
          </div>
        </div>
      </div>
    );
  } else {
    return <Fragment></Fragment>;
  }
}

export default withRouter(DrawTodoList);
