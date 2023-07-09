import "./index.css";

import React from "react";
import "./index.css";
import App from "./App";
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { makeServer } from "./server";

const root = document.getElementById("root");

// Call make Server
makeServer();
const rootElement = (
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

createRoot(root).render(rootElement);
