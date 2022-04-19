import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Item: {
        fields: {
          isLiked: {
            merge: (existing, incoming) => {
              // console.log(existing, incoming);
              return existing ?? incoming;
            },
          },
        },
      },
    },
  }),
  resolvers: {
    Item: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLike: (_, { id }, { cache }) => {
        // console.log(cache);
        const targetId = cache.identify({
          __typename: "Item",
          id,
        });
        // console.log(targetId);

        cache.modify({
          id: targetId,
          fields: {
            isLiked: (current) => !current,
          },
        });
      },
    },
  },
});

export default client;
