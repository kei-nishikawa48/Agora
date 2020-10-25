import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

const IndexPage = () => {
  const [text, set_text] = useState('');
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  });

  const handle_click = async () => {
    try {
      const res = await client.query({
        query: gql`
          query {
            hello
          }
        `,
      });
      set_text(res.data.hello);
    } catch (res) {
      console.error(res);
    }
  };
  
  return (
    <ApolloProvider client={client}>
      <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
      </Layout>
      <button onClick={handle_click}>get text from graphql</button>
      <h1>{text}</h1>
    </ApolloProvider>
  );
};

export default IndexPage;
