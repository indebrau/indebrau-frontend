import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  // eslint-disable-next-line no-undef
  uri: process.env.BACKEND_ENDPOINT,
  cache: new InMemoryCache(),
  link,
  request: (operation) => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      },
    });
  },
});




export default apolloClient;
