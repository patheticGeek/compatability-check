import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setup } from "twind";
import { withForms } from "@twind/forms";
import { Provider } from "react-redux";
import store from "./state/store";
import "twind/shim";

setup({
  preflight: withForms(),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
