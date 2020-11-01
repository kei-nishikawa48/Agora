import { gql } from 'apollo-server-express';
import { article_schema } from './article';
import { user_schema } from './user';

const link_schema = gql`
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

export default [link_schema, user_schema, article_schema];
