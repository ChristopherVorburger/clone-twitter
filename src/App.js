import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Layout from "./components/Layout";
import Bookmarks from "./pages/Bookmarks";

import { AuthContext } from "./context/authContext";
import { SnackbarsContextProvider } from "./context/snackbarsContext";
import TweetPage from "./pages/Tweet/TweetPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const auth = React.useContext(AuthContext);

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
      {/* ScrollToTop permet de revenir en haut de la page quand on clique sur un Link */}
      <ScrollToTop />
      {!auth.authUser ? (
        <Routes>
          <Route path='/' element={<Prehome />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      ) : (
        <Layout>
          <SnackbarsContextProvider>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/exemple' element={<Exemple />} />
              <Route path='/:username' element={<Profile />} />
              <Route path='/:username/followers' element={<Followers />} />
              <Route path='/:username/following' element={<Following />} />
              <Route path='/settings/profile' element={<EditProfileModal />} />
              <Route path='/bookmarks' element={<Bookmarks />} />
              <Route path='/status/:pseudo' element={<TweetPage />} />
              <Route path='*' element={<Navigate to='/home' />} />
            </Routes>
          </SnackbarsContextProvider>
        </Layout>
      )}
    </ThemeProvider>
  );
}
