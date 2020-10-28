import { gql } from 'apollo-server-express';

export const user_schema = gql`
  type Query {
    users: [User]!
    user: User!
  }

  type Mutation {
    create_user(name: String, email: String): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
  }
`;
