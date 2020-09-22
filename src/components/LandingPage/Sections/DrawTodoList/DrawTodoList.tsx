import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { RootState } from "../../../../reducers";
import { TodoStatus } from "../../../../types/enum/Todo";
import { TodoInfo, TodoQueryVariables } from "../../../../types/interface/Todo";
import { GET_TODOS } from "../../../../queries/Todo";

import {
  getTodos,
  changePrevTodoStatus,
  changeGetTodoQueryVariables,
  changeIndexOfClickedUpdateBtn,
} from "../../../../actions/Todo/todoAction";

import "./DrawTodoList.scss";
import TodoTab from "../TodoTab/TodoTab";
import AddTodo from "../AddTodo/AddTodo";

const DATA_LIMIT = 3;

function DrawTodoList() {
  const [todoList, setTodoList] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const [isMoreData, setIsMoreData] = useState(true);

  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todos: TodoInfo[] = todoState.todos;
  const todoStatus: TodoStatus | undefined = todoState.todoStatus;
  const prevTodoStatus: TodoStatus | undefined = todoState.prevTodoStatus;
  const variables: TodoQueryVariables = todoState.getTodosQueryVariables;

  /* 쿼리 variables에 변화가 일어날 시 서버에 재요청해서 다시 반영한다. */
  const { error, data } = useQuery(GET_TODOS, {
    variables,
  });

  useEffect(() => {
    if (data) {
      if (prevTodoStatus !== todoStatus) {
        setTodoList(data.todos.slice(0, 3));
        dispatch(changePrevTodoStatus(todoStatus));

        if (data.todos.length < DATA_LIMIT + 1) setIsMoreData(false);
        else {
          setCursor(parseFloat(data.todos[data.todos.length - 2].id));
          setIsMoreData(true);
        }
      }
      if (prevTodoStatus === todoStatus) {
        setTodoList(todoList.concat(data.todos.slice(0, 3)));
        dispatch(getTodos(data.todos.slice(0, 3)));
        if (data.todos.length < DATA_LIMIT + 1) setIsMoreData(false);
        else {
          setCursor(parseFloat(data.todos[data.todos.length - 2].id));
          setIsMoreData(true);
        }
      }
    }
  }, [data]);

  // 컴포넌트로 빼자
  const drawTodoList = () => {
    return todoList.map((todo: any, idx: number) => {
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

  const handleMoreBtn = async () => {
    await dispatch(
      changeGetTodoQueryVariables({
        cursor,
        status: todoStatus,
      })
    );
  };

  // todo 목록 불러오기 실패 !!
  if (error) {
    console.error(error);
    if (error.graphQLErrors[0]) alert(error.graphQLErrors[0].message);
  }

  if (todoList.length > 0) {
    return (
      <div>
        <div className="todo_list_wrap">
          <div className="container">
            <TodoTab />
            {drawTodoList()}
            {isMoreData ? (
              <Button
                type="primary"
                className="more_btn"
                onClick={handleMoreBtn}
              >
                더 보기
              </Button>
            ) : (
              <Fragment></Fragment>
            )}
            <AddTodo />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="todo_list_wrap">
          <div className="container">
            <TodoTab />

            <AddTodo />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DrawTodoList);
