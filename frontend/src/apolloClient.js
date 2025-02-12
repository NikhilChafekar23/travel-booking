import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Apollo Client setup with GraphQL endpoint
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://travel-booking-h0t6.onrender.com/graphql',  // GraphQL API endpoint
    credentials: 'same-origin',  // Use 'include' if your backend needs credentials
  }),
  cache: new InMemoryCache(),
});

export default client;
