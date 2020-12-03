import Layout from '../../../components/Layout';
import PostListDetail from '../../../components/PostListDetail';
import { useRouter } from 'next/router';
import { GET_ARTICLE } from '../../../client_hooks/articles';
import { useQuery } from '@apollo/client';


const StaticPropsDetail = () => {
  const router = useRouter();
  const { data } = useQuery(GET_ARTICLE, {
    variables: { id: router.query.id },
  });
  return (
    <Layout title={`${data && data.article.title}`}>
      {data && <PostListDetail item={data.article} />}
    </Layout>
  );
};

export default StaticPropsDetail;
