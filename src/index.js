import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { ModalContextProvider } from "./context/modalContext";
import { SnackbarsContextProvider } from "./context/snackbarsContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ModalContextProvider>
          <SnackbarsContextProvider>
            <App />
          </SnackbarsContextProvider>
        </ModalContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
