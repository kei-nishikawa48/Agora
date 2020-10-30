import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import firebase from "../utils/Firebase"

type User = {
  name: string;
  email: string;
};

type FormData = User;

const IndexPage = () => {
  const [users, set_users] = useState<User[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/graphql',
  });

  const handle_submit = async (data: FormData) => {
    try {
      const { name, email } = data;
      const res = await client.mutate({
        mutation: gql`
          mutation {
            create_user(name: "${name}", email: "${email}"){
              name
              email
            }
          }
        `,
      });
      reset();
      console.log(res);
    } catch (res) {
      console.log(res);
    }
  };
  const handle_click = async () => {
    try {
      const res = await client.query({
        query: gql`
          query {
            users {
              name
              email
            }
          }
        `,
      });
      set_users(res.data.users);
    } catch (res) {
      console.error(res);
    }
  };

  const logout=async()=>{
    await firebase.auth().signOut()
  }

  return (
    <>
      <form onSubmit={handleSubmit(handle_submit)}>
        <input type="text" name="name" ref={register({ required: true })} />
        <input type="email" name="email" ref={register({ required: true })} />
        <button type="submit">Submit</button>
      </form>
      <ApolloProvider client={client}>
        <Layout title="Home | Next.js + TypeScript Example">
          <h1>Hello Next.js 👋</h1>
            <Link href="/about">
              <a>About</a>
            </Link>
            <button onClick={logout} >logout</button>
        </Layout>
        <button onClick={handle_click}>get text from graphql</button>
        {users.map((user, i) => (
          <li key={i}>
            {user.name} {user.email}
          </li>
        ))}
      </ApolloProvider>
    </>
  );
};

export default IndexPage;
