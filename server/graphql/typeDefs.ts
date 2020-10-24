import { gql } from 'apollo-server';

/**
 * @desc GraphQLのスキーマを定義
 */
export const typeDefs = gql`
    type Query {
        hello: String
    }
`;
