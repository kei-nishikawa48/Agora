import Layout from '../../../components/Layout';
import PostListDetail from '../../../components/PostListDetail';
import { createApolloFetch } from 'apollo-fetch';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Post } from '../../../interfaces';

const fetch = createApolloFetch({
  uri: 'https://morning-beyond-12035.herokuapp.com/graphql',
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
    tags
    user{
      name
    }
  }
}`;
  const res = await fetch({
    query: query,
    variables: {
      id: postId,
    },
  });
  const data = res.data;

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
