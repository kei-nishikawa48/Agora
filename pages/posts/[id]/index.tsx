import Layout from '../../../components/Layout';
import PostListDetail from '../../../components/PostListDetail';
import { createApolloFetch } from 'apollo-fetch';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Post } from '../../../interfaces';

const fetch = createApolloFetch({
  uri: 'http://localhost:3000/graphql',
});

const StaticPropsDetail = ({ data }: { data: { article: Post } }) => {
  return (
    <Layout title={`${data && data.article.title}`}>
      {data && <PostListDetail item={data.article} />}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postId = context.params?.id; // context.params で、paths で指定した params を参照できる
  const query = `query get_article($id:ID!){
  article(id:$id){
    text
    id
    title
  }
}`;
  const res = await fetch({
    query: query,
    variables: {
      id: postId,
    },
  });
  const data = res.data;

  // 実際はここで await fetch(`https://.../posts/${postId}`) などとして外部 API からデータを取得するイメージ
  return {
    props: { postId, data },
    revalidate: 60,
  };
};

export const getStaticPaths:GetStaticPaths = async () => {
  const data = await fetch({
    query: `{
        articles {
          id
        }
      }
      `,
  });
  const paths = data?.data?.articles?.map((article: Post) => {
    return `/posts/${article.id}`;
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export default StaticPropsDetail;
