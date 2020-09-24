import React, { useEffect, useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { RootState } from "../../../../reducers";
import { TodoStatus } from "../../../../types/enum/Todo";
import { TodoInfo, TodoQueryVariables } from "../../../../types/interface/Todo";
import { GET_TODOS } from "../../../../queries/Todo";
import { DELETE_TODO } from "../../../../mutations/Todo";

import {
  getTodos,
  changePrevTodoStatus,
  changeGetTodoQueryVariables,
  changeTodoIdOfClickedUpdateBtn,
  deleteTodoAction,
} from "../../../../actions/Todo/todoAction";

import "./DrawTodoList.scss";
import TodoTab from "../TodoTab/TodoTab";
import AddTodo from "../AddTodo/AddTodo";
import UpdateTodo from "../UpdateTodo/UpdateTodo";

const DATA_LIMIT = 3;

/*
    아폴로 GraphQL 쿼리를 이용해 데이터를 가져오면
    커서 기반 페이지네이션을 구현하는데 있어
    너무 많은 에로사항이 생긴다.
    
    특히, Mutation 작업이 반영되기 위해서는 새로고침을 할 수 밖에 없는데,
    좀 더 리덕스와 상호작용하면서 우아하게 동작할 수 있는 방법을 추후 생각해보자.

    이는 전체 데이터를 가져와서 리덕스 스토어에 저장 후,
    중간 데이터가 변하면 상태의 변화가 일어나 바로 반영되는 것과 달리,
    데이터를 커서로 끊어서 가져오기 때문에 관리의 한계가 생긴 것이다.
*/
function DrawTodoList() {
  const [todoList, setTodoList] = useState<TodoInfo[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [isMoreData, setIsMoreData] = useState(true);

  const [deleteTodo] = useMutation(DELETE_TODO); //  make mutation function
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

  const handleDelete = async (id: number) => {
    console.log("todo id in handleDelete : ", id);
    console.log("todo id type in handleDelete : ", typeof id);
    try {
      if (typeof id === "string")
        await dispatch(deleteTodoAction(parseFloat(id), deleteTodo));
      else await dispatch(deleteTodoAction(id, deleteTodo));

      window.location.reload(false);
    } catch (err) {
      console.error(err);
      alert("todo 삭제에 실패했습니다 !");
    }
  };

  const drawTodoList = () => {
    return todoList.map((todo: TodoInfo, idx: number) => {
      if (todoIdOfClickedUpdateBtn && todoIdOfClickedUpdateBtn === todo.id) {
        return (
          <div key={idx} className="todo_wrap">
            <UpdateTodo description={todo.description} />
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
              <Button
                className="delete_btn"
                onClick={() => handleDelete(todo.id)}
              >
                삭제
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
          <AddTodo todoList={todoList} />
        </div>
      </div>
    </div>
  );
}

export default withRouter(DrawTodoList);
