import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Prehome from "./pages/Prehome";
import SignUp from "./pages/SignUp/SingUp";
import Login from "./components/Login/Login";
import Home from "./pages/Home";
import Exemple from "./components/Exemple";
import Profile from "./pages/Profile";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import EditProfileModal from "./components/EditProfileModal";

export default function App() {
  // Création d'un thème pour changer la couleur principale de MUI
  let theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
      black: {
        main: "#282d31",
        darker: "#0f1419",
      },
      grey: {
        main: "#536471",
        button: "#cfd9de",
        background__input: "#eff3f4",
        background__trend: "#f7f9f9",
      },
      white: {
        main: "#ffffff",
      },
    },
    typography: {
      font: {
        small: 13,
        main: 15,
        large: 20,
      },
      lightBold: 400,
      mainBold: 700,
      titleBold: 800,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exemple" element={<Exemple />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:username/followers" element={<Followers />} />
        <Route path="/:username/following" element={<Following />} />
        <Route path="/settings/profile" element={<EditProfileModal />} />
      </Routes>
    </ThemeProvider>
  );
}
