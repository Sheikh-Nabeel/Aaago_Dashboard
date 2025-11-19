// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
// import { store } from "./store";

const Root = (
  import.meta.env?.DEV
    ? (
        <Provider store={store}>
          <App />
        </Provider>
      )
    : (
        <StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </StrictMode>
      )
);

createRoot(document.getElementById("root")).render(Root);
