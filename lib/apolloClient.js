import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: process.env.BACKEND_ENDPOINT,
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  // eslint-disable-next-line no-undef
  cache: new InMemoryCache(),
  link
});


export default apolloClient;
