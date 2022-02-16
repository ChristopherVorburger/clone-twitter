import React from "react";
import Login from "./components/Login/Login";
import SignUp from "./pages/SignUp/SingUp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

import Prehome from "./pages/Prehome";

export default function App() {
  // Création d'un thème pour changer la couleur principale de MUI
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}
