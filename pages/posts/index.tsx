import Link from 'next/link';
import Layout from '../../components/Layout';
import PostList from '../../components/PostList';

const WithStaticProps = () => {
  return(
  <Layout title="Posts List | Next.js + TypeScript Example">
    <h1>Posts List</h1>

    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /posts</p>
    <PostList/>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);
  }

export default WithStaticProps;
