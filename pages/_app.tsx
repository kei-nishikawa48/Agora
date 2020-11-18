import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '../styles/theme';
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useCookies, CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(['token']);
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  // Remove the server-side injected CSS.(https://material-ui.com/guides/server-rendering/)
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const authLink = setContext(async (_, { headers }) => {

    // get the authentication token from local storage if it exists
    const token = cookies['token'];
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? token : '',
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <CookiesProvider>
        <ApolloProvider client={client}>
          <StylesProvider injectFirst>
            <MaterialUIThemeProvider theme={theme}>
              <StyledComponentsThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </StyledComponentsThemeProvider>
            </MaterialUIThemeProvider>
          </StylesProvider>
        </ApolloProvider>
    </CookiesProvider>
  );
}
