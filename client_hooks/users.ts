import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      email
      name
      id
      uid
      createdAt
      updatedAt
      articles {
        id
        title
        text
        tags
        updatedAt
        createdAt
        comments {
          id
          text
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query get_user($id: ID!) {
    user(id: $id) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

// export function get_users() {
//   const { loading, data } = useQuery(GET_USERS);
//   if (loading) {
//     return 'loading';
//   }
//   return data;
// }

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    sign_up(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    sign_in(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation delete_user($id: ID!) {
    delete_user(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation update_user($id: ID!, $name: String, $email: String!) {
    update_user(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
