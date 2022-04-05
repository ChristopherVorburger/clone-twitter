import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { ModalContextProvider } from "./context/modalContext";
import { GlobalContextProvider } from "./context/globalContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalContextProvider>
        <AuthContextProvider>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
