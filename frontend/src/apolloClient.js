import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,  // URL of your backend server
  cache: new InMemoryCache(),
});

export default client;
