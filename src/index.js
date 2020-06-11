import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider } from "@material-ui/core/styles";
import FalconTheme from "./falcon.theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={FalconTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
