import Link from 'next/link';
import Layout from '../components/Layout';
import { useCookies } from 'react-cookie';
import React from 'react';

const IndexPage = () => {
  const [, , removeCookie] = useCookies(['token']);
  const logout = async () => {
    await removeCookie('token');
    location.replace('/signin');
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
