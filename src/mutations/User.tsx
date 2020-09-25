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

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($newPassword: String!) {
    updatePassword(newPassword: $newPassword) {
      id
      name
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Float!) {
    deleteUser(id: $id) {
      deleteSuccess
      name
      email
      role
    }
  }
`;
