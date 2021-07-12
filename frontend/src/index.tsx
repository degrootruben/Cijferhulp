import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./index.scss";

import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);