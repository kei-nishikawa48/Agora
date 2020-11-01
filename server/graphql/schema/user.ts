import { gql } from 'apollo-server-express';

export const user_schema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    create_user(name: String, email: String, uid: String): User!
    delete_user(id: ID!): Boolean
    update_user(id: ID!, name: String, email: String): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    uid: String!
    articles: [Article!]
    comments: [Comment!]
  }
`;
