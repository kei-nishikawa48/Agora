import Link from 'next/link';
import Layout from '../components/Layout';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../client_hooks/users';
import { useCookies } from 'react-cookie';

const IndexPage = () => {
  const [, , removeCookie] = useCookies(['token']);
  const { data } = useQuery(GET_USERS);
  data && console.log(data);

  const logout = async () => {
    removeCookie('token');
  };
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
      <button onClick={logout}>logout</button>
    </Layout>
  );
};

export default IndexPage;
