import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
  query getAllTodos {
    allTodos {
      id
      description
      status

      createdBy: user {
        id
        name
        role
      }
    }
  }
`;

export const GET_TODOS = gql`
  query getTodos($cursor: Float) {
    todos(cursor: $cursor) {
      id
      description
      status

      createdBy: user {
        id
        name
        role
      }
    }
  }
`;
