import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
  query getAllTodos {
    allTodos {
      id
      description
      status
      createdAt

      createdBy: user {
        id
        name
        role
      }
    }
  }
`;

export const GET_TODOS = gql`
  query getTodos($cursor: Float, $status: TodoStatus) {
    todos(cursor: $cursor, status: $status) {
      id
      description
      status
      createdAt

      createdBy: user {
        id
        name
        role
      }
    }
  }
`;
