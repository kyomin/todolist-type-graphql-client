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
