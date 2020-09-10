import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/* For UI */
import "antd/dist/antd.css";

/* For Apollo */
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/* For Redux */
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import Reducer from "./reducer";

/* Redux Setting */
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

/* Apollo Setting */
const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);