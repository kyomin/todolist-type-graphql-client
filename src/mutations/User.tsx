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

export const REGISTER = gql`
  mutation register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      name
      email
      role
    }
  }
`;
