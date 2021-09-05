import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setup } from "twind";
import { withForms } from "@twind/forms";
import "twind/shim";

setup({
  preflight: withForms(),
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
