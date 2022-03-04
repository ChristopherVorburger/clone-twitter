import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { ModalContextProvider } from "./context/modalContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
