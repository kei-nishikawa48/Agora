import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Post } from '../../interfaces';
import { samplePostData } from '../../utils/sample-data';
import Layout from '../../components/Layout';
import PostList from '../../components/PostList';

type Props = {
  items: Post[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Posts List | Next.js + TypeScript Example">
    <h1>Posts List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /posts</p>
    <PostList items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const items: Post[] = samplePostData;
  return { props: { items } };
};

export default WithStaticProps;
