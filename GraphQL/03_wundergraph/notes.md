Sure! Here’s a **step-by-step guide** to set up an Apollo Federation v2 project with:

* ✅ **Product subgraph**
* ✅ **Review subgraph**
* ✅ **Gateway**
* ✅ All in **Node.js** using **Apollo Server 4** and **Apollo Subgraph**

---

## 🧱 1. Prerequisites

Make sure you have:

* Node.js >= 18
* npm or yarn

Create a project folder:

```bash
mkdir apollo-federation-demo
cd apollo-federation-demo
```

---

## 📦 2. Setup Project Structure

```bash
mkdir gateway product-service review-service
```

---

## 📦 3. Gateway Setup

### Navigate and initialize:

```bash
cd gateway
npm init -y
npm install @apollo/gateway apollo-server graphql
```

### Create `index.js`:

```js
// gateway/index.js
const { ApolloServer } = require('apollo-server');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'product', url: 'http://localhost:4001/graphql' },
      { name: 'review', url: 'http://localhost:4002/graphql' },
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
```

---

## 📦 4. Product Service Setup

### Setup:

```bash
cd ../product-service
npm init -y
npm install @apollo/server @apollo/subgraph graphql graphql-tag
```

### Create `index.js`:

```js
// product-service/index.js
const { ApolloServer } = require('@apollo/server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const gql = require('graphql-tag');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String
    price: Int
  }

  type Query {
    product(id: ID!): Product
  }
`;

const products = [
  { id: "1", name: "iPhone", price: 999 },
  { id: "2", name: "Samsung Galaxy", price: 799 },
];

const resolvers = {
  Query: {
    product: (_, { id }) => products.find(p => p.id === id),
  },
  Product: {
    __resolveReference: ({ id }) => products.find(p => p.id === id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

startStandaloneServer(server, { listen: { port: 4001 } }).then(() => {
  console.log('📦 Product subgraph running at http://localhost:4001/graphql');
});
```

---

## 📦 5. Review Service Setup

### Setup:

```bash
cd ../review-service
npm init -y
npm install @apollo/server @apollo/subgraph graphql graphql-tag
```

### Create `index.js`:

```js
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
  }
`;

const reviews = [
  { id: "101", productId: "1", body: "Great phone!" },
  { id: "102", productId: "1", body: "Battery life could be better." },
];

const resolvers = {
  Query: {
    review: (_, { id }) => reviews.find(r => r.id === id),
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
```

---

## 🚀 6. Run Everything

In 3 separate terminals:

```bash
# Terminal 1
cd product-service
node index.js

# Terminal 2
cd review-service
node index.js

# Terminal 3
cd gateway
node index.js
```

Visit: [http://localhost:4000/](http://localhost:4000/)

---

## 🧪 Example Query

```graphql
query {
  product(id: "1") {
    name
    price
    reviews {
      id
      body
    }
  }
}
```

---

## ✅ Summary

| Service | Port | Role                              |
| ------- | ---- | --------------------------------- |
| Product | 4001 | Serves `Product` entity           |
| Review  | 4002 | Extends `Product`, adds `reviews` |
| Gateway | 4000 | Federates the graph               |

---

Would you like a GitHub-ready version of this project or a zip file scaffold?
