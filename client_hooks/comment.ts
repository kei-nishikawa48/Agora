import { gql, useQuery } from '@apollo/client';

const GET_COMMENTS = gql`
  query {
    comments {
      id
      text
      createdAt
      updatedAt
    }
  }
`;

export const get_comments = () => {
  const { loading, data } = useQuery(GET_COMMENTS);
  if (loading) {
    return 'loading';
  }
  return data;
};

export const CREATE_COMMENT = gql`
  mutation create_comment(
    $text: String!
    $user_id: String!
    $article_id: String!
  ) {
    create_comment(text: $text, user_id: $user_id, article_id: $article_id) {
      text
      id
    }
  }
`;

export const UPDATA_COMMENT = gql`
  mutation update_comment($id: ID!, $text: String!) {
    update_comment(id: $id, text: $text) {
      text
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation delete_comment($id: String!) {
    delete_comment(id: $id)
  }
`;
