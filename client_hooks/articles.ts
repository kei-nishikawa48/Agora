import { gql,useQuery} from '@apollo/client';

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
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation create_article(
    $user_id: String!
    $title: String!
    $tags: String!
    $text: String!
  ) {
    create_article(user_id: $user_id, title: $title, tags: $tags, text: $text) {
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
