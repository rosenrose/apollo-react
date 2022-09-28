import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  uri: "https://movieql-osuiaeahvq-uc.a.run.app/",
  cache: new InMemoryCache(),
  resolvers: { Movie: { isLiked: () => false } },
});

export default client;
