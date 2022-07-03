import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  uri: "https://rosenrose-movieql.herokuapp.com/",
  cache: new InMemoryCache(),
  resolvers: { Movie: { isLiked: () => false } },
});

export default client;
