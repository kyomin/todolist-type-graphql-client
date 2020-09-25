import React, { useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button } from "antd";
import { RootState } from "../../../reducers";
import { TodoInfo } from "../../../types/interface/Todo";
import { GET_ALL_TODOS } from "../../../queries/Todo";
import { DELETE_TODO } from "../../../mutations/Todo";

import {
  getAllTodos,
  deleteTodoAction,
} from "../../../actions/Todo/todoAction";

import "./TodoList.scss";

const { Title } = Typography;

function TodoList() {
  const { error, data } = useQuery(GET_ALL_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO); // make mutation function
  const dispatch = useDispatch();
  const todoState: any = useSelector((state: RootState) => state.Todo);
  const todoList: TodoInfo[] | undefined = todoState.allTodos;

  useEffect(() => {
    if (data) {
      dispatch(getAllTodos(data.allTodos));
    }
  }, [data]);

  const handleDelete = async (id: number) => {
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

  // todo 목록 불러오기 실패 !!
  if (error) {
    console.error(error);
    if (error.graphQLErrors[0]) alert(error.graphQLErrors[0].message);
  }

  const drawTodoList = () => {
    if (todoList) {
      return todoList.map((todo: TodoInfo, idx: number) => {
        return (
          <div key={idx} className="todo_wrap">
            <span className="todo_index">{idx + 1}. </span>
            <div className="todo_description">{todo.description}</div>
            <div className="todo_user_name">{todo.createdBy.name}</div>
            <Button
              className="delete_btn"
              onClick={() => handleDelete(todo.id)}
            >
              삭제
            </Button>
          </div>
        );
      });
    } else {
      return <Fragment></Fragment>;
    }
  };

  return (
    <div>
      <div className="admin_todo_list_wrap">
        <div className="container">
          <Title level={2} style={{ color: "#40a9ff", textAlign: "center" }}>
            Todo Delete Management
          </Title>
          {drawTodoList()}
        </div>
      </div>
    </div>
  );
}

export default withRouter(TodoList);
