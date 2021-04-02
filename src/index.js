import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { Provider } from "react-redux";
import configureStore from "./configureStore";

const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
