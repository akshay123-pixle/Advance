// gateway/index.js
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'product', url: 'http://localhost:4001/graphql' },
      { name: 'review', url: 'http://localhost:4002/graphql' },
      { name: 'user', url: 'http://localhost:4003/graphql' },
      // { name: 'users', url: 'http://localhost:4003/graphql' },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Gateway running at ${url}`);
});
