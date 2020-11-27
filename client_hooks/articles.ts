import { gql, useQuery } from '@apollo/client';

export const GET_ARTICLES = gql`
  query {
    articles {
      id
      title
      text
      tags
      createdAt
      updatedAt
      comments {
        id
        text
        createdAt
        updatedAt
      }
    }
  }
`;
export const GET_ARTICLE = gql`
  query get_article($id: ID!) {
    article(id: $id) {
      text
      id
      title
      tags
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation create_article($title: String!, $tags: String!, $text: String!) {
    create_article(title: $title, tags: $tags, text: $text) {
      text
      title
      tags
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation update_article(
    $id: ID!
    $title: String!
    $tags: String!
    $text: String!
  ) {
    update_article(id: $id, title: $title, tags: $tags, text: $text) {
      text
      title
      id
      tags
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation delete_article($id: ID!) {
    delete_article(id: $id)
  }
`;

export function get_articles() {
  const { loading, data } = useQuery(GET_ARTICLES);
  if (loading) {
    return 'loading';
  }
  return data;
}
