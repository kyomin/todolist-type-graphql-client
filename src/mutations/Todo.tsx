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
