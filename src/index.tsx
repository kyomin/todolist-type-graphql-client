import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* For UI */
import "antd/dist/antd.css";

/* For Apollo */
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/* Apollo Setting */
const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "Bearer ",
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
