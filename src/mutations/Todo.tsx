import { gql } from "@apollo/client";

export const MAKE_TODO = gql`
  mutation makeTodo($makeTodoInput: MakeTodoInput!) {
    makeTodo(makeTodoInput: $makeTodoInput) {
      id
      userId
      description
      status
      createdAt
    }
  }
`;

export const UPDATE_TODO_DESCRIPTION = gql`
  mutation updateTodoDescription($id: Float!, $newDescription: String!) {
    updateTodoDescription(id: $id, newDescription: $newDescription) {
      id
      description
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: Float!) {
    deleteTodo(id: $id) {
      description
      status
    }
  }
`;
