const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const gql = require("graphql-tag");
const { startStandaloneServer } = require("@apollo/server/standalone");

// Example in-memory data store
const users = [
  { id: "1", productId: "1", name: "John Doe", age: 30 },
  { id: "2", productId: "2", name: "Jane Smith", age: 25 },
];

// Define typeDefs (Schema)
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    age: Int
    product: Product
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
    name: String! @external
    users: [User]
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    addUser(name: String!, age: Int, productId: ID!): User
  }
`;

// Example resolver that can return user data
const resolvers = {
  Query: {
    user: (_, { id }) => users.find((user) => user.id === id),
    users: () => users,
  },
  Mutation: {
    addUser: (_, { name, age, productId }) => {
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        productId,
      };
      users.push(newUser);
      return newUser;
    },
  },
  User: {
    // This resolver is used to resolve the product field for a user
    product: (user) => ({ __typename: "Product", id: user.productId }),
    __resolveReference: (reference) =>
      users.find((user) => user.id === reference.id),
  },
};

// Build the Apollo Server instance with schema and resolvers
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

// Start the server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4003 },
  });

  console.log(`User service is running at ${url}`);
}

startServer();
