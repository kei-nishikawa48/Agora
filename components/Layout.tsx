import React, { ReactNode } from 'react';
import dynamic from "next/dynamic"
import Head from 'next/head';
<<<<<<< HEAD
import SimpleMenu from './SimpleMenu';
=======
const DynamicHeader = dynamic(() => import('./Header'), {
  ssr: false,
});
>>>>>>> develop

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
<<<<<<< HEAD
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/form">
          <a>Form</a>
        </Link>{' '}
        |{' '}
        <Link href="/signin">
          <a>Signin</a>
        </Link>{' '}
        |{' '}
        <Link href="/signup">
          <a>Signup</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/posts">
          <a>Posts List</a>
        </Link>{' '}
        <SimpleMenu />
      </nav>
    </header>
=======
    <DynamicHeader/>
>>>>>>> develop
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
