// review-service/index.js
const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const gql = require('graphql-tag');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = gql`
  type Review {
    id: ID!
    productId: ID!
    body: String
    product: Product
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }

  type Query {
    review(id: ID!): Review
    reviews:[Review]
  }
`;

const reviews = [
  { id: "101", productId: "1", body: "Great phone!" },
  { id: "102", productId: "1", body: "Battery life could be better." },
  { id: "103", productId: "2", body: "Akki." },
];

const resolvers = {
  Query: {
    review: (_, { id }) => reviews.find(r => r.id === id),
    reviews:()=>reviews
  },
  Product: {
    reviews: (product) => reviews.filter(r => r.productId === product.id),
  },
  Review: {
    product: (review) => ({ __typename: "Product", id: review.productId }),
  },

};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4002 } }).then(() => {
  console.log('📝 Review subgraph running at http://localhost:4002/graphql');
});
