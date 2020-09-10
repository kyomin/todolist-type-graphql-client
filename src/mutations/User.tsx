import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      name
      email
      role
      accessToken
      refreshToken
    }
  }
`;
