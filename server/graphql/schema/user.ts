import { gql } from 'apollo-server-express';

export const user_schema = gql`
  type Query {
    users: [User]!
    user: User!
  }

  type Mutation {
    create_user(name: String, email: String): User!
    delete_user(id: ID!): Boolean
    update_user(id: ID!, name: String, email: String): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    uid: String!
    articles: [Article!]
  }
`;
