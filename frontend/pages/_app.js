import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import withData from '../lib/withData';
import Page from '../components/Page';
import { SearchStateProvider } from '../lib/searchState';

// display loading states on top of the screen when route changes
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <ChakraProvider>
        <SearchStateProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </SearchStateProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default withData(MyApp);
