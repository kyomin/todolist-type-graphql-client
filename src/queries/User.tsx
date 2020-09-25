import { gql } from "@apollo/client";

export const AUTH = gql`
  query getUser {
    auth {
      id
      name
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    allUsers {
      id
      name
      email
      role
    }
  }
`;
