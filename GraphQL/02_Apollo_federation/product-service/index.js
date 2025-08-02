// Importing ApolloServer from the @apollo/server package to create the GraphQL server
const { ApolloServer } = require('@apollo/server');

// Importing buildSubgraphSchema from @apollo/subgraph to build a federated subgraph schema
const { buildSubgraphSchema } = require('@apollo/subgraph');

// Importing the gql function from graphql-tag to parse GraphQL schema strings into an AST
const gql = require('graphql-tag');

// Importing startStandaloneServer from @apollo/server/standalone to run the Apollo Server in a standalone mode
const { startStandaloneServer } = require('@apollo/server/standalone');

// Define the GraphQL schema using the gql template literal tag. This defines the structure of your GraphQL API.
const typeDefs = gql`
  # Defining the Product type with @key directive for federation. 'id' is the key field for the Product type.
  type Product @key(fields: "id") {
    id: ID!        # Unique identifier for the Product
    name: String   # Name of the product
    price: Int     # Price of the product
  }

  # Defining the Query type with a single field, 'product', that fetches a Product by ID
  type Query {
    product(id: ID!): Product   # Query to fetch a product by its ID
  }
`;

// Dummy product data (in a real application, this would come from a database)
const products = [
  { id: "1", name: "iPhone", price: 999 },      // Product 1
  { id: "2", name: "Samsung Galaxy", price: 799 },  // Product 2
];

// Resolver function for the Query type. This fetches a product by its ID from the 'products' array.
const resolvers = {
  Query: {
    product: (_, { id }) => products.find(p => p.id === id),  // Find and return the product based on ID
  },
  // Resolver to resolve references from other services. It allows federated services to look up the Product by ID.
  Product: {
    __resolveReference: ({ id }) => products.find(p => p.id === id),  // Resolves the reference to a product by ID
  },
};

// Creating an instance of ApolloServer, passing the federated schema with typeDefs and resolvers
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),  // Using buildSubgraphSchema to create the federated schema
});

// Start the server in standalone mode. This will start the server on port 4001 and serve the GraphQL API.
startStandaloneServer(server, { listen: { port: 4001 } }).then(() => {
  console.log('📦 Product subgraph running at http://localhost:4001/graphql');  // Log the message when server is up and running
});
