import { gql } from 'apollo-server-express';

export const article_schema = gql`
  extend type Query {
    articles: [Article!]!
    article(id: ID!): Article!
  }

  extend type Mutation {
    create_article(text: String!): Article!
    delete_article(id: ID!): Boolean!
    update_article(id: ID!,title: String!, text: String!, tags: String!): Article!
  }

  type Article {
    id: ID!
    title: String!
    text: String!
    tags: String!
    user: User!
  }
`;
