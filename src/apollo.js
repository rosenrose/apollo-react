import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  resolvers: {
    Item: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLike: (_, { id, isLiked }, { cache }) => {
        // console.log(cache);
        const targetId = cache.identify({
          __typename: "Item",
          id,
        });
        // console.log(targetId);

        cache.modify({
          id: targetId,
          fields: {
            isLiked: () => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
