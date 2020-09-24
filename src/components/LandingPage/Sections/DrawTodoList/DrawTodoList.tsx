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
  changeTodoIdOfClickedUpdateBtn,
} from "../../../../actions/Todo/todoAction";

import "./DrawTodoList.scss";
import TodoTab from "../TodoTab/TodoTab";
import AddTodo from "../AddTodo/AddTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";

const DATA_LIMIT = 3;

function DrawTodoList() {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [isMoreData, setIsMoreData] = useState(true);

  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todoStatus: TodoStatus | undefined = todoState.todoStatus;
  const prevTodoStatus: TodoStatus | undefined = todoState.prevTodoStatus;
  const variables: TodoQueryVariables = todoState.getTodosQueryVariables;
  const todoIdOfClickedUpdateBtn: number | undefined =
    todoState.todoIdOfClickedUpdateBtn;

  /* 쿼리 variables에 변화가 일어날 시 서버에 재요청해서 다시 반영한다. */
  const { error, data } = useQuery(GET_TODOS, {
    variables,
  });

  /* 비즈니스 로직을 다 넣는 것에 대해 개선 사항 생각해보기 */
  useEffect(() => {
    if (data) {
      if (prevTodoStatus !== todoStatus) {
        setTodoList(data.todos.slice(0, 3));
        dispatch(getTodos(data.todos.slice(0, 3)));
        dispatch(changePrevTodoStatus(todoStatus));

        if (data.todos.length < DATA_LIMIT + 1) setIsMoreData(false);
        else {
          setCursor(parseFloat(data.todos[data.todos.length - 2].id));
          setIsMoreData(true);
        }
      }
      if (prevTodoStatus === todoStatus) {
        setTodoList(todoList.concat(data.todos.slice(0, 3)));
        if (data.todos.length < DATA_LIMIT + 1) setIsMoreData(false);
        else {
          setCursor(parseFloat(data.todos[data.todos.length - 2].id));
          setIsMoreData(true);
        }
      }
    }
  }, [data]);

  const handleUpdateBtnClicked = async (id: number) => {
    await dispatch(changeTodoIdOfClickedUpdateBtn(id));
  };

  /*
    UpdateTodo 컴포넌트로부터 업데이트 된 리스트를 받아와서 다시 셋팅한다.
    데이터가 업데이트 되면, 위의 useEffect가 재 실행돼서 원치 않는 동작을 하게 되지만,
    다시 여기로 넘어와 셋팅을 하게 되면 원하는 결과를 얻게할 수 있다.
  */
  const refreshUpdatedDescription = async (updatedTodoList: TodoInfo[]) => {
    setTodoList(updatedTodoList);
  };

  /*
    등록을 하면 현재 화면의 리스트에 추가가 된다.
    하지만, DB 반영도 잘 되는데, 탭을 변경해서 서버로 재 쿼리를 날리면
    새로운 데이터부터 잘 가져와지지 않는다.
    이 부분 추후에 해결하자!
  */
  const refreshCreatedTodo = async (createdTodoList: TodoInfo[]) => {
    setTodoList(createdTodoList);
  };

  const drawTodoList = () => {
    return todoList.map((todo: TodoInfo, idx: number) => {
      if (todoIdOfClickedUpdateBtn && todoIdOfClickedUpdateBtn === todo.id) {
        return (
          <div key={idx} className="todo_wrap">
            <UpdateTodo
              todoList={todoList}
              description={todo.description}
              refreshUpdatedDescription={refreshUpdatedDescription}
            />
          </div>
        );
      } else {
        return (
          <div key={idx} className="todo_wrap">
            <div>
              <span className="todo_index">{idx + 1}. </span>
              {todo.description}
            </div>
            <div className="btn_container">
              <Button
                className="update_btn"
                onClick={() => handleUpdateBtnClicked(todo.id)}
              >
                수정
              </Button>
            </div>
          </div>
        );
      }
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

  return (
    <div>
      <div className="todo_list_wrap">
        <div className="container">
          <TodoTab />
          {drawTodoList()}
          {isMoreData ? (
            <Button type="primary" className="more_btn" onClick={handleMoreBtn}>
              더 보기
            </Button>
          ) : (
            <Fragment></Fragment>
          )}
          <AddTodo
            todoList={todoList}
            refreshCreatedTodo={refreshCreatedTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(DrawTodoList);
