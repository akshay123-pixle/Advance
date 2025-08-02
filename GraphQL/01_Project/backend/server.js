import express from 'express';  // Import Express to create the server
import { ApolloServer } from '@apollo/server';  // Import Apollo Server to handle GraphQL requests
import { ApolloGateway } from '@apollo/gateway';  // Apollo Gateway to unite multiple GraphQL APIs
import cors from 'cors';  // For enabling CORS
import fetch from 'node-fetch';  // For making requests from WunderGraph to the backend

// --------- Step 1: Define the User Service (Users API) ---------
import { ApolloServer as UserServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

// User GraphQL Service (Runs on localhost:4001)
const userTypeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String
  }

  type Query {
    getUser(id: ID!): User
  }
`;

const userResolvers = {
  Query: {
    getUser: (_, { id }) => {
      return { id, name: "John Doe", email: "john@example.com" };
    },
  },
};

const userServer = new UserServer({
  schema: buildFederatedSchema([{ typeDefs: userTypeDefs, resolvers: userResolvers }]),
});

userServer.listen(4001).then(() => {
  console.log("User service running on http://localhost:4001");
});

// --------- Step 2: Define the Product Service (Products API) ---------
import { ApolloServer as ProductServer, gql as productGQL } from 'apollo-server';

const productTypeDefs = productGQL`
  type Product @key(fields: "id") {
    id: ID!
    name: String
    price: Float
  }

  type Query {
    getProduct(id: ID!): Product
  }
`;

const productResolvers = {
  Query: {
    getProduct: (_, { id }) => {
      return { id, name: "Apple", price: 1.99 };
    },
  },
};

const productServer = new ProductServer({
  schema: buildFederatedSchema([{ typeDefs: productTypeDefs, resolvers: productResolvers }]),
});

productServer.listen(4002).then(() => {
  console.log("Product service running on http://localhost:4002");
});

// --------- Step 3: Apollo Gateway Setup ---------

// Create an Apollo Gateway to combine the User and Product services
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4001' },
    { name: 'products', url: 'http://localhost:4002' },
  ],
});

// Set up the Apollo Gateway server
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen(4000).then(() => {
  console.log("Apollo Gateway running on http://localhost:4000/graphql");
});

// --------- Step 4: Integrate with WunderGraph ---------

import { defineConfig } from '@wundergraph/sdk';  // WunderGraph SDK

// Define WunderGraph Config
const wunderGraphConfig = defineConfig({
  dataSources: [
    {
      name: 'users',
      kind: 'rest',
      config: {
        baseUrl: 'http://localhost:4001/graphql',  // Pointing to the Users API
      },
    },
    {
      name: 'products',
      kind: 'rest',
      config: {
        baseUrl: 'http://localhost:4002/graphql',  // Pointing to the Products API
      },
    },
  ],
});

// Start WunderGraph API
import { createWunderGraphServer } from '@wundergraph/sdk';
const wunderGraphServer = createWunderGraphServer(wunderGraphConfig);

const wunderGraphApp = express();
wunderGraphApp.use(cors());

// Apply the WunderGraph middleware to expose the GraphQL API
wunderGraphServer.applyMiddleware({ app: wunderGraphApp, path: '/graphql' });

// Start the WunderGraph server on port 9991
wunderGraphApp.listen(9991, () => {
  console.log("WunderGraph server running on http://localhost:9991/graphql");
});

