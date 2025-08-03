import {pkg} from "@wundergraph/sdk"
const { defineWunderGraphApp, configureWunderGraphApplication } = pkg;

console.log("Starting the WunderGraph application configuration...");

const app = defineWunderGraphApp({
  apis: [
    {
      api: "product",
      url: "http://localhost:4001/graphql",
      introspect: true,
    },
    {
      api: "review",
      url: "http://localhost:4002/graphql",
      introspect: true,
    },
    {
      api: "user",
      url: "http://localhost:4003/graphql",
      introspect: true,
    },
  ],
});

console.log("Application configuration created...");

configureWunderGraphApplication({
  app,
}).then(() => {
  console.log("WunderGraph application successfully configured!");
}).catch((error) => {
  console.error("Error configuring WunderGraph application:", error);
});
