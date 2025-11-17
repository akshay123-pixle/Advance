// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

// Use CRA environment variables (must start with REACT_APP_)
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

console.log("Auth0 domain (from env):", domain);

// Fallbacks for quick local testing (optional — remove for real use)
if (!domain || !clientId) {
  console.warn(
    "REACT_APP_AUTH0_DOMAIN or REACT_APP_AUTH0_CLIENT_ID not set. Using local test values."
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
