import React, { ReactNode } from 'react';
import dynamic from "next/dynamic"
import Head from 'next/head';
const DynamicHeader = dynamic(() => import('./Header'), {
  ssr: false,
});

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
    <DynamicHeader/>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
