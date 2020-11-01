import { gql } from 'apollo-server-express';
import { article_schema } from './article';
import { user_schema } from './user';
import { comment_schema } from './comment';

const link_schema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [link_schema, user_schema, article_schema, comment_schema];
