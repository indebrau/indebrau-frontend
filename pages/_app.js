import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withData from '../lib/withData';
import theme from '../lib/theme';

class MyApp extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apollo}>
          <CssBaseline />
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}

export default withData(MyApp);
