import { gql } from "apollo-server-express";

export const article_schema = gql`
  type Query {
    articles: [Article!]!
    article: (id: ID!): Article!
  }

  type Mutation {
    create_article(text: String!): Article!
    delete_article(id: ID!): Boolean!
    update_article(id: ID!, text: String!): Article!
  }

  type Article {
    id: ID!
    text: String!
    user: User!
  }
`;