import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import apolloClient from '../lib/apolloClient';
import theme from '../lib/theme';
import Head from 'next/head';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
